const qrcodeList = require('./../src');
const expect = require('chai').expect;



describe('Test getOption', function () {
  var getOption = qrcodeList.getOption;

  it('option is null', function () {
    expect(getOption(null)).to.deep.equal({
      'except': [],
      'lists': [],
      'only': null,
      'title': '',
      'description': '',
    });
  });

  it('option is not null', function () {
    expect(getOption({
      'except': ['README.md'],
    })).to.deep.equal({
      'except': ['README.md'],
      'lists': [],
      'only': null,
      'title': '',
      'description': '',
    });

    expect(getOption({
      'pushmetop': 'pushmetop',
    })).to.deep.equal({
      'except': [],
      'lists': [],
      'only': null,
      'title': '',
      'description': '',
    });
  });
});

describe('Test createQrcode', function () {
  var createQrcode = qrcodeList.createQrcode;

  it('createQrcode is work', function () {
    expect(createQrcode('pushmetop')).to.have.string('data:image');
  });

});

describe('Test buildList', function () {
  qrcodeList.createQrcode = function (text) {
    return text;
  };

  var createQrcode = qrcodeList.createQrcode;
  var buildList = qrcodeList.buildList;
  
  it('createQrcode is work', function () {
    expect(createQrcode('pushmetop')).to.equal('pushmetop');
  });

  it('list is null', function () {
    expect(buildList(null)).to.equal('');
  });

  it('list.src and list.text is null', function () {
    expect(buildList({
      src: null,
      text: null,
    })).to.equal('');
  });

  it('list.src is not null', function () {
    expect(buildList({
      src: 'pushmetop',
    })).to.equal('' + 
      '<div class="gitbook-plugin-qrcode-list">' +
        '<img src="pushmetop" alt="">' + 
        '<p></p>' +
      '</div>' );
  });

  it('list.text is not null', function () {
    expect(buildList({
      text: 'pushmetop',
    })).to.equal('' + 
      '<div class="gitbook-plugin-qrcode-list">' +
        '<img src="pushmetop" alt="">' + 
        '<p></p>' +
      '</div>' );
  });

  it('list.content is not null', function () {
    expect(buildList({
      src: 'pushmetop',
      content: 'pushmetop',
    })).to.equal('' + 
      '<div class="gitbook-plugin-qrcode-list">' +
        '<img src="pushmetop" alt="">' + 
        '<p>pushmetop</p>' +
      '</div>' );
  });

  it('list.alt is not null', function () {
    expect(buildList({
      src: 'pushmetop',
      alt: 'pushmetop',
    })).to.equal('' + 
      '<div class="gitbook-plugin-qrcode-list">' +
        '<img src="pushmetop" alt="pushmetop">' + 
        '<p></p>' +
      '</div>' );
  });
});

describe('Test buildHtml', function () {
  var buildHtml = qrcodeList.buildHtml;

  it('lists is null', function () {
    expect(buildHtml(null)).to.equal('');
    expect(buildHtml(null, null)).to.equal('');
  });

  it('lists is not null', function () {
    expect(buildHtml([{
      src: 'pushmetop',
      content: 'pushmetop',
      alt: 'pushmetop',
    }])).to.equal('' + 
      '<footer class="gitbook-plugin-qrcode-lists">' +
        '<div class="gitbook-plugin-qrcode-list">' +
        '<img src="pushmetop" alt="pushmetop">' + 
          '<p>pushmetop</p>' +
        '</div>' +
      '</footer>'
    );

    expect(buildHtml([{
      text: 'pushmetop',
      content: 'pushmetop',
      alt: 'pushmetop',
    }])).to.equal('' + 
      '<footer class="gitbook-plugin-qrcode-lists">' +
        '<div class="gitbook-plugin-qrcode-list">' +
        '<img src="pushmetop" alt="pushmetop">' + 
          '<p>pushmetop</p>' +
        '</div>' +
      '</footer>'
    );
  });

  it('lists and title is not null', function () {
    expect(buildHtml([{
      src: 'pushmetop',
      content: 'pushmetop',
      alt: 'pushmetop',
    }], '捐助&联系')).to.equal('' + 
      '<footer class="gitbook-plugin-qrcode-lists">' +
        '<h2>捐助&联系</h2>' +
        '<div class="gitbook-plugin-qrcode-list">' +
        '<img src="pushmetop" alt="pushmetop">' + 
          '<p>pushmetop</p>' +
        '</div>' +
      '</footer>'
    );
  });
});

describe('Test buildHtml', function () {
  var pageBefore =  qrcodeList.hooks['page:before'];
 
  it('config is null', function () {
    var change = pageBefore.bind({
      config: {
        get: function (config) {
          return {
            'qrcode-list': {},
          };
        },
      }
    });

    expect(change({
      title: 'pushmetop',
      content: '',
    })).to.deep.equal({
      title: 'pushmetop',
      content: '',
    });
  });

  it('page is in except', function () {
    var change = pageBefore.bind({
      config: {
        get: function (config) {
          return {
            'qrcode-list': {
              except: [ 'pushmetop' ],
              lists: [
                {
                  src: 'pushmetop',
                  content: 'pushmetop',
                  alt: 'pushmetop',
                }
              ],
            },
          };
        },
      }
    });

    expect(change({
      title: 'pushmetop',
      content: '',
    })).to.deep.equal({
      title: 'pushmetop',
      content: '',
    });
  });

  it('page is not in except', function () {
    var change = pageBefore.bind({
      config: {
        get: function (config) {
          return {
            'qrcode-list': {
              title: 'pushmetop',
              description: 'pushmetop',
              except: [],
              lists: [
                {
                  src: 'pushmetop',
                  content: 'pushmetop',
                  alt: 'pushmetop',
                }
              ],
            },
          };
        },
      }
    });

    expect(change({
      title: 'pushmetop',
      content: '',
    })).to.deep.equal({
      title: 'pushmetop',
      content: '' + 
        '<footer class="gitbook-plugin-qrcode-lists">' + 
          '<h2>pushmetop</h2>' +
          '<p>pushmetop</p>' +
          '<div class="gitbook-plugin-qrcode-list">' + 
            '<img src="pushmetop" alt="pushmetop">' +
            '<p>pushmetop</p>' +
          '</div>' +
        '</footer>',
    });
  });

  it('page is not in only', function () {
    var change = pageBefore.bind({
      config: {
        get: function (config) {
          return {
            'qrcode-list': {
              title: 'pushmetop',
              description: 'pushmetop',
              only: [],
              lists: [
                {
                  src: 'pushmetop',
                  content: 'pushmetop',
                  alt: 'pushmetop',
                }
              ],
            },
          };
        },
      }
    });

    expect(change({
      title: 'pushmetop',
      content: '',
    })).to.deep.equal({
      title: 'pushmetop',
      content: '',
    });
  });
});

describe('Test isArray', function () {
  var isArray =  qrcodeList.isArray;
 
  it('is array', function () {
    expect(isArray([])).to.equal(true);
    expect(isArray(['pushmetop', 'to', 'be', 1])).to.equal(true);
  });

  it('is not array', function () {
    expect(isArray(1)).to.equal(false);
    expect(isArray('pushmetop')).to.equal(false);
    expect(isArray({'pushmetop': 'pushmetop'})).to.equal(false);
  });
});
