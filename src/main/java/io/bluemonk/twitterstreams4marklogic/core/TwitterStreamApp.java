package io.bluemonk.twitterstreams4marklogic.core;

import com.marklogic.client.DatabaseClientFactory;
import twitter4j.*;
import twitter4j.conf.Configuration;
import twitter4j.conf.ConfigurationBuilder;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


public class TwitterStreamApp {

    static class TweetListener implements StatusListener {

        public void onStatus(Status status) {
            String rawJson = TwitterObjectFactory.getRawJSON(status);
            try {
                MarkLogicDocumentDAO.insertTweet(Long.toString(status.getId()), rawJson);
            } catch (MarkLogicConnectionException e) {
                e.printStackTrace();
            }
        }

        public void onDeletionNotice(StatusDeletionNotice sdn) {
            //do nothing
        }

        public void onTrackLimitationNotice(int i) {
            //do nothing
        }

        public void onScrubGeo(long lat, long lng) {
            //do nothing
        }

        public void onException(Exception e) {
            e.printStackTrace();
        }

        public void onStallWarning(StallWarning stallWarning) {
            System.out.println(stallWarning);
        }
    }

    static class TweetCleaner implements Runnable {

        private static long duration = 0;

        public static void schedule(long msec){
            duration = msec;
            repeatSchedule();
        }

        private static void repeatSchedule(){
            ScheduledExecutorService ex = Executors.newSingleThreadScheduledExecutor();
            ex.schedule(new TweetCleaner(), duration, TimeUnit.MILLISECONDS);
        }

        public void run() {
            try {
                repeatSchedule();
                MarkLogicDocumentDAO.deleteExpiredTweet();
            } catch (MarkLogicConnectionException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) throws Exception {

        //Load properties
        EnvProp.init();
        MarkLogicConnection.init(
                EnvProp.getSingleton().getProperty(EnvProp.KEY_ML_HOST),
                Integer.parseInt(EnvProp.getSingleton().getProperty(EnvProp.KEY_ML_PORT)),
                EnvProp.getSingleton().getProperty(EnvProp.KEY_ML_DATABASE_NAME),
                EnvProp.getSingleton().getProperty(EnvProp.KEY_ML_USER),
                EnvProp.getSingleton().getProperty(EnvProp.KEY_ML_PASSWORD),
                DatabaseClientFactory.Authentication.DIGEST
        );

        //Execute Twitter streaming api
        Configuration configuration = new ConfigurationBuilder().setOAuthConsumerKey(
                EnvProp.getSingleton().getProperty(EnvProp.KEY_TW_CONSUMER_KEY))
                .setOAuthConsumerSecret(EnvProp.getSingleton().getProperty(EnvProp.KEY_TW_CONSUMER_SECRET))
                .setOAuthAccessToken(EnvProp.getSingleton().getProperty(EnvProp.KEY_TW_ACCESS_TOKEN))
                .setOAuthAccessTokenSecret(EnvProp.getSingleton().getProperty(EnvProp.KEY_TW_ACCESS_TOKEN_SECRET))
                .setJSONStoreEnabled(true)
                .build();
        TwitterStream twStream = new TwitterStreamFactory(configuration).getInstance();
        twStream.addListener(new TweetListener());
        twStream.sample();

        //Execute cleaner
        TweetCleaner.schedule(10000L);
    }
}