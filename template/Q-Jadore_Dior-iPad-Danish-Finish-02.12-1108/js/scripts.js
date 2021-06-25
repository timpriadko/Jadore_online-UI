'use strict';

$(document).ready(function () {
  //disable context
  $(document).bind("contextmenu", function (e) {
    return false;
  });

  /* custom keyboard layouts */
  var normalLayout = [
    '1 2 3 4 5 6 7 8 9 0 -',
    '@ q w e r t y u i o p',
    'a s d f g h j k l {bksp}',
    '~ z x c v b n m . \' {accept}',
  ];

  // var shiftLayout = [
  //   '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
  //   '{tab} Q W E R T Y U I O P { } |',
  //   'A S D F G H J K L : " {accept}',
  //   '{shift} Z X C V B N M < > ? {shift}',
  //   '{alt} {space} {cancel}'
  // ];
  //
  // var altLayout = [
  //   '~ \u00a1 \u00b2 \u00b3 \u00a4 \u20ac \u00bc \u00bd \u00be \u2018 \u2019 \u00a5 \u00d7 {bksp}',
  //   '{tab} \u00e4 \u00e5 \u00e9 \u00ae \u00fe \u00fc \u00fa \u00ed \u00f3 \u00f6 \u00ab \u00bb \u00ac',
  //   '\u00e1 \u00df \u00f0 f g h j k \u00f8 \u00b6 \u00b4 {accept}',
  //   '{shift} \u00e6 x \u00a9 v b \u00f1 \u00b5 \u00e7 > \u00bf {shift}',
  //   '@ {alt} {space} {alt} {cancel}'
  // ];
  //
  // var altShitlayout = [
  //   '~ \u00b9 \u00b2 \u00b3 \u00a3 \u20ac \u00bc \u00bd \u00be \u2018 \u2019 \u00a5 \u00f7 {bksp}',
  //   '{tab} \u00c4 \u00c5 \u00c9 \u00ae \u00de \u00dc \u00da \u00cd \u00d3 \u00d6 \u00ab \u00bb \u00a6',
  //   '\u00c4 \u00a7 \u00d0 F G H J K \u00d8 \u00b0 \u00a8 {accept}',
  //   '{shift} \u00c6 X \u00a2 V B \u00d1 \u00b5 \u00c7 . \u00bf {shift}',
  //   '{alt} {space} {alt} {cancel}'
  // ]
  /* custom keyboard layouts */

  if (window.innerWidth > 1024) {
    // init https://mottie.github.io/Keyboard/

    if ($('#first_name, #last_name').length > 0) {
      $('#first_name, #last_name').keyboard({
        layout: 'custom',
        position: {
          // null = attach to input/textarea;
          // use $(sel) to attach elsewhere
          of: '#email',
          my: 'center top',
          // at: 'center top',
          // used when "usePreview" is false
          at2: 'center bottom'
        },
        usePreview: false,
        customLayout: {
          normal: normalLayout,
          // shift: shiftLayout,
          // alt: altLayout,
          // 'alt-shift': altShitlayout,
        },
        visible: function (e, keyboard) {
          keyboard.$keyboard.find('.ui-keyboard-accept').text('Enter')
        },
        autoAccept: true,
        appendTo: $('.keyboard'),
      });
    }

    if ($('#email').length > 0) {
      $('#email').keyboard({
        layout: 'custom',
        position: {
          of: null,
          my: 'center top',
          // at: 'center top',
          at2: 'center bottom'
        },
        usePreview: false,
        customLayout: {
          normal: normalLayout,
          // shift: shiftLayout,
          // alt: altLayout,
          // 'alt-shift': altShitlayout,
        },
        visible: function (e, keyboard) {
          keyboard.$keyboard.find('.ui-keyboard-accept').text('Enter')
        },
        autoAccept: true,
        appendTo: $('.keyboard'),
      });
    }
  }

  //validate email
  var email = $('#email');

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return regex.test(email);
  };

  function ifNotSpace(field) {
    var regex = /\S/;
    return regex.test(field);
  }


  // validate Terms agreement
  var terms = $('#terms');
  var news = $('#news');
  var termsSubmitLabel = $('#termsSubmitLabel');
  var termsSubmit = $('#termsSubmit');

  var email_terms_validation = function () {
    if ($(terms).is(':checked') && isEmail(email.val()) && ifNotSpace(email.val())) {
      termsSubmit.removeAttr('disabled');
      termsSubmitLabel.removeClass('disabled');
    } else {
      termsSubmit.attr('disabled', 'disabled');
      termsSubmitLabel.addClass('disabled');
    }
  };

  terms.click(email_terms_validation);
  news.click(email_terms_validation);

  email.change(function () {
    email_terms_validation()
  });

  email.keyup(function () {
    email_terms_validation()
  });

  function termsSubmitHandler() {
    $(this).closest('form')[0].submit();
  }

  termsSubmit.click(termsSubmitHandler);

  /* setup modal */
  var termsBtn = $('.terms-btn');
  var policyBtn = $('.policy-btn');
  var informationProvided = $('.information-provided');
  var termsModal = $('#modal-terms');
  var policyModal = $('#modal-policy');
  var modalInformation = $('#modal-information');
  var closeBtn = $('.ui-close-modal');

  termsBtn.on('click', function () {
    termsModal.addClass('show');
  });

  policyBtn.on('click', function () {
    policyModal.addClass('show');
  });

  informationProvided.on('click', function () {
    modalInformation.addClass('show');
  });

  closeBtn.on('click', function () {
    termsModal.removeClass('show');
    policyModal.removeClass('show');
    modalInformation.removeClass('show');
  });

  // close modal by clicking outside the modal window
  $('.modal-wrap').click(function (e) {
    if (e.target === $('.modal-wrap.show')[0]) {
      $('.modal-wrap').removeClass('show');
    }
  })

  // send request about sent sample - for virtual device!
  function sentSampleHandler() {
    if (odoreConfig) {
      const {
        deviceId,
      } = odoreConfig;
      fetch(
        `${window.location.protocol}//${window.location.host}/devices/${deviceId}/deliver?number=1`
      )
    }
  }

  if (window.location.pathname.includes('/last.html')) {
    sentSampleHandler();
  }

  /* end modal */
});
