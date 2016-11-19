define(function (require, exports, module) {
    'use strict';
    function Model() {
        return {
            reset:function () {
                this.file = "";
                this.place_id = "";
                this.place_name = "";
            }
            ,setImage: function (file) {
                this.file = file;
            },
            getImage: function () {
                return this.file;
            },
            send: function (url) {

            }
            , setPlace: function (id, name) {
                this.place_id = id;
                this.place_name = name;
            }
            , getPlace: function () {
                return {
                    name: this.place_name
                    , id: this.place_id
                }
            }

        }
    }

    return Model();
});