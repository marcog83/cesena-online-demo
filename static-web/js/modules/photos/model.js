define(function (require, exports, module) {
    'use strict';
    function Model() {
        return {
            reset: function () {
                this.file = null;
                this.place_id = null;
                this.place_name =null;
                this.message = null;
            }
            , setMessage: function (text) {
                this.message = text;
            }
            , getMessage: function () {
                return this.message;
            }
            , setImage: function (file) {
                this.file = file;
            },
            getImage: function () {
                return this.file;
            },
            send: function () {
                if (!this.message || !this.place_id) {
                    return Promise.reject({message: "campi obbligatori"});
                }
                return new Promise(function (resolve) {
                    var formData = new FormData();

                    formData.append("message", this.message);
                    formData.append("place_name", this.place_name); // number 123456 is immediately converted to a string "123456"
                    formData.append("place_id", this.place_id); // number 123456 is immediately converted to a string "123456"

// HTML file input, chosen by user

                    if (this.file) {
                        formData.append("image", this.file);
                    }
                    var request = new XMLHttpRequest();
                    request.onload =function(){
                        resolve();
                    };
                    request.open("POST", "/upload");
                    request.send(formData);
                }.bind(this)).then(this.reset.bind(this))
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