
var PopupExit = function (closeBtn, popup, seconds) {

    var self = this;
    var getCookie = jQuery.cookie('exitPopupViewed');
    var convertedSeconds = seconds * 1000;

    self.closePopupInitialize = function () {
        // initialize close popup functions

        $(document).on('click', popup, function (e) {
            if (e.target != this) {
                return;
            }
            else {
                $(this).parents(popup).removeClass('m__opened-popup');
            }
        });

        $(document).on('click', closeBtn, function (e) {
            e.preventDefault();
            $(this).parents(popup).removeClass('m__opened-popup');
        });

    };

    self.checkPopupCookie = function () {
        // check popup cookie available 

        if (getCookie) {
            return false;
        }
        else {
            return true; // no cookie
        }

    };

    self.addPopupCookie = function () {
        // add cookie for a 7 days

        jQuery.cookie('exitPopupViewed', {
            expires: 7,
            path: '/'
        });

        $(popup).addClass('m__popup-viewed');

    };

    self.showPopup = function () {

        $(popup).addClass('m__opened-popup');

    };

    self.init = function () {
        // Initialization

        if (self.checkPopupCookie() && $(popup).length != 0) {
            setTimeout(function () {
                $(document).on('mouseleave', function (e) {
                    if (e.clientY < 1 && !$(popup).hasClass('m__popup-viewed')) {
                        self.showPopup();
                        self.addPopupCookie();
                        self.closePopupInitialize();
                    }
                });
            }, convertedSeconds);
        }
        else {
            return false;
        }

    };

    self.init();

};

var initPopupExit = new PopupExit('.m__closePopupBtn', '.exitPopup', 8);
