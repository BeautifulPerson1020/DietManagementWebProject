function openVerificationPopup() {
    var popupWidth = 400;
    var popupHeight = 330;

    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    var leftPosition = (screenWidth - popupWidth) / 2;
    var topPosition = (screenHeight - popupHeight) / 2;

    window.open('verification.html', 'Verification', 'width='+popupWidth +',height=' + popupHeight + ', left=' + leftPosition + ', top=' + topPosition);
}