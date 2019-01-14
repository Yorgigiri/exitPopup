
var PopupExit = function (closeBtn, popup, seconds) {

    var self = this;
    var getCookie = jQuery.cookie('exitPopupCookie'); // Получаем куку (если она есть то не выводим попап)

    self.closePopupInitialize = function () {
        // Запуск работы областей закрытия попапа

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
        // Проверка наличия куки

        if (getCookie) {
            return false;
        }
        else {
            return true; // нет куки
        }
    };

    self.addPopupCookie = function () {
        // Добавление куки на год

        jQuery.cookie('exitPopupCookie', {
            expires: 7,
            path: '/'
        });

    };

    self.showPopup = function () {

        $(popup).addClass('m__opened-popup');

    };

    self.init = function () {
        // Инициализация

        if (self.checkPopupCookie() && $(popup).length != 0) {
            setTimeout(function () {
                $(document).on('mouseleave', function (e) {
                    if (e.clientY < 1) {
                        self.showPopup();
                        self.addPopupCookie();
                        self.closePopupInitialize(); // инициализация закрывающих элементов
                    }
                });
            }, seconds);
        }
        else {
            return false;
        }

    };

    self.init();

};

var initPopupExit = new PopupExit('.m__closePopupBtn', '.exitPopup', 10000);
