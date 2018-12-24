var qrcode = require('./qrcode.js');

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

      if (option.except.indexOf(page.title) != -1
        || option.lists.length == 0) {
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
      'except': [],
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
  
    return defaultOption;
  },

  // Build footer qrcode list html
  buildHtml: function (lists, title, description) {
    var html = '';

    title = title && title != '' ? '<h2>' + title + '</h2>' : '';
    description = description && description != '' ? '<p>' + description + '</p>' : '';
    
    lists = lists
      && typeof lists === 'object'
      && lists.constructor === Array ? lists : [];

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
    list.src = list.src ? list.src : me.createQrcode(list.text);

    return list.src
      ? '' + 
        '<div class="gitbook-plugin-qrcode-list">' +
          '<img src="' + list.src + '" alt="' + list.alt +'">' + 
          '<p>' + list.content + '</p>' +
        '</div>' 
      : '';
  },

  // Create qrcode
  createQrcode: function (text, typeNumber, errorCorrectLevel) {
    var qr = qrcode(typeNumber || 10, errorCorrectLevel || 'H');
    qr.addData(text);
    qr.make();
    return qr.createSvgTag();
  }
};