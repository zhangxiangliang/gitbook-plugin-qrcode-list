var qrcode = require('../lib/qrcode.js');

qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];

var me = module.exports = {
  // Extend website resources and html
  website: {
    assets: './assets',
    css: [ 'index.css' ],
  },

  // Map of hooks
  hooks: {
    'page:before': function (page) {
      var option = me.getOption(this.config.get('pluginsConfig')['qrcode-list']);

      if (option.lists.length == 0
        || (!option.only && option.except.indexOf(page.title) != -1)
        || (!option.except && option.only && option.only.indexOf(page.title) == -1)) {
        return page;
      }

      var html = me.buildHtml(option.lists, option.title, option.description);
      
      page.content = page.content + html;

      return page;
    },
  },

  // Map of new blocks
  blocks: {},

  // Map of new filters
  filters: {},

  // Get the operation to use default values if none exists
  getOption: function (config) {
    var defaultOption = {
      'except': null,
      'only': null,
      'lists': [],
      'title': '',
      'description': '',
    };
  
    if (config) {
      for (var item in defaultOption) {
        if (item in config) {
          defaultOption[item] = config[item];
        }
      }
    }

    if (defaultOption.except === null && defaultOption.only  === null) {
      defaultOption.except = [];
    }

    if (me.isArray(defaultOption.except) && me.isArray(defaultOption.only)) {
      defaultOption.only = null;
    }
  
    return defaultOption;
  },

  // Judge is array
  isArray: function (target) {
    return target
      && typeof target === 'object'
      && target.constructor === Array;
  },

  // Build footer qrcode list html
  buildHtml: function (lists, title, description) {
    var html = '';

    title = title && title != '' ? '<h2>' + title + '</h2>' : '';
    description = description && description != '' ? '<p>' + description + '</p>' : '';
    
    lists = me.isArray(lists) ? lists : [];

    for (var i = 0; i < lists.length; i++) {
      html += me.buildList(lists[i]);
    }
  
    return lists.length > 0
      ? '' + 
        '<footer class="gitbook-plugin-qrcode-lists">'+
           title +
           description +
           html +
        '</footer>'
      : '';
  },

  // Create qrcode
  buildList: function (list) {
    if (!list || (!list.src && !list.text)) {
      return '';
    }

    list.alt = list.alt ? list.alt : '';
    list.content = list.content ? list.content : '';
    list.text = list.text ? list.text : '';
    list.src = list.src && list.src != '' ? list.src : me.createQrcode(list.text, list.margin);

    return list.src
      ? '' + 
        '<div class="gitbook-plugin-qrcode-list">' +
          '<img src="' + list.src + '" alt="' + list.alt +'">' + 
          '<p>' + list.content + '</p>' +
        '</div>' 
      : '';
  },

  // Create qrcode
  createQrcode: function (text, margin, typeNumber, errorCorrectLevel) {
    var qr = qrcode(typeNumber || 10, errorCorrectLevel || 'H');
    qr.addData(text);
    qr.make();
    return qr.createDataURL(2, margin || 4);
  }
};
