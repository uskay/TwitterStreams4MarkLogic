package io.bluemonk.twitterstreams4marklogic.core;

import com.marklogic.client.DatabaseClient;
import com.marklogic.client.DatabaseClientFactory;
import com.marklogic.client.Transaction;
import com.marklogic.client.document.JSONDocumentManager;
import com.marklogic.client.io.StringHandle;
import com.marklogic.client.query.QueryManager;

import javax.management.Query;

/**
 * Created by uskay on 7/28/15.
 */
public class MarkLogicConnection {

    private static JSONDocumentManager jsonManager = null;
    private static QueryManager queryManager = null;
    private static DatabaseClient client = null;

    public static void init(String host, int port, String databaseName, String user, String password, DatabaseClientFactory.Authentication authType) {
        client = DatabaseClientFactory.newClient(host, port, databaseName, user, password, authType);
        jsonManager = client.newJSONDocumentManager();
        queryManager = client.newQueryManager();
        queryManager.setPageLength(Long.parseLong(EnvProp.getSingleton().getProperty(EnvProp.KEY_ML_PAGE_LENGTH)));
    }

    public static JSONDocumentManager getJsonManager() throws MarkLogicConnectionException {
        if (jsonManager == null){
            throw new MarkLogicConnectionException("JSON MANAGER: Connection uninitialized!!");
        }
        return jsonManager;
    }

    public static QueryManager getQueryManager() throws MarkLogicConnectionException {
        if (queryManager == null){
            throw new MarkLogicConnectionException("QUERY MANAGER: Connection uninitialized!!");
        }
        return queryManager;
    }

    public static Transaction openTransaction(){
        return client.openTransaction();
    }

}
