package io.bluemonk.twitterstreams4marklogic.core;

import java.util.Map;
import java.util.Properties;

/**
 * Created by uskay on 7/29/15.
 */
public class EnvProp extends Properties implements EnvKeys {

    private static EnvProp prop = new EnvProp();

    public static void init(){
        Map<String, String> env = System.getenv();
        for (String envName : env.keySet()) {
            prop.setProperty(envName, env.get(envName));
        }
    }

    public static EnvProp getSingleton(){
        return prop;
    }

}
