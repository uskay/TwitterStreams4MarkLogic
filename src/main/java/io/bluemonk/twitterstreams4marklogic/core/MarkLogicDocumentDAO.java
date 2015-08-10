package io.bluemonk.twitterstreams4marklogic.core;

import com.marklogic.client.Transaction;
import com.marklogic.client.io.SearchHandle;
import com.marklogic.client.io.StringHandle;
import com.marklogic.client.query.MatchDocumentSummary;
import com.marklogic.client.query.StructuredQueryBuilder;
import com.marklogic.client.query.StructuredQueryDefinition;

/**
 * Created by uskay on 7/28/15.
 */
public class MarkLogicDocumentDAO {

    public static void insertTweet(String tweetId, String rawJSON) throws MarkLogicConnectionException {
        //Transaction tx = MarkLogicConnection.openTransaction();
        try {
            StringHandle handle = new StringHandle();
            handle.set(rawJSON);
            MarkLogicConnection.getJsonManager().write(createDocumentName(tweetId), handle);
        } catch (Exception e) {
            //tx.rollback();
            MarkLogicConnectionException myException = new MarkLogicConnectionException("Insert failed!! --> " + e.getMessage());
            myException.setStackTrace(e.getStackTrace());
            throw myException;
        }
        //tx.commit();
    }

    private static String createDocumentName(String tweetId){
        return EnvProp.getSingleton().getProperty(EnvProp.KEY_ML_DOC_URI_FORMAT).replace(
                EnvProp.getSingleton().getProperty(EnvProp.KEY_ML_DOC_URI_KEY), tweetId);
    }

    public static void deleteExpiredTweet() throws MarkLogicConnectionException {
        //Transaction tx = MarkLogicConnection.openTransaction();
        try {
            StructuredQueryBuilder queryBuilder = MarkLogicConnection.getQueryManager().newStructuredQueryBuilder();
            long expiredTimeMills = System.currentTimeMillis() - Long.parseLong(EnvProp.getSingleton().getProperty(EnvProp.KEY_TW_EXPIRE_TIME_MILLS));
            StructuredQueryDefinition query = queryBuilder.range(queryBuilder.jsonProperty("timestamp_ms"), "long", StructuredQueryBuilder.Operator.LE, expiredTimeMills);
            SearchHandle resultsHandle = new SearchHandle();
            MarkLogicConnection.getQueryManager().search(query, resultsHandle);
            for (MatchDocumentSummary result: resultsHandle.getMatchResults()) {
                MarkLogicConnection.getJsonManager().delete(result.getUri());
            }
            System.out.println("Delete done!! --> " + resultsHandle.getMatchResults().length);
        } catch (Exception e) {
            //tx.rollback();
            MarkLogicConnectionException myException = new MarkLogicConnectionException("Expired tweet delete failed!! --> " + e.getMessage());
            myException.setStackTrace(e.getStackTrace());
            throw myException;
        }
        //tx.commit();
    }


}
