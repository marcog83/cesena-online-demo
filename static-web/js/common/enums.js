/**
 * Created by mgobbi   on 18/11/2015.
 */
define(function () {

    return {
        DESTROY: "destroy",
        DESKTOP_MEDIA_QUERY: "only screen and (min-width: 1024px)",
        TABLET_PORTRAIT_MEDIA_QUERY: "only screen and (min-width:768px) and (max-width:1023px)",
        MOBILE_MEDIA_QUERY: "only screen and (max-width: 767px)",
        FROM_TABLET_MEDIA_QUERY: "only screen and (min-width: 768px)"
        , LoginEvent: {
            LOGGED_IN: "LOGGED_IN",
            LOGGED_OUT: "LOGGED_OUT"
            , MIXPANEL_LOADED: "MIXPANEL_LOADED"
        }
        ,PopupEvent:{
            OPEN:"OPEN"
            ,CLOSE:"CLOSE"
        }


    };
});