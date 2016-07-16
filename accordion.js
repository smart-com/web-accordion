(function() {
  
  var localDocument = document.currentScript.ownerDocument;
  
  // CUSTOM ELEMENTS
  
  // parent - optional ( HTMLElement по умолчанию )
  // foo - optional ( по умолчанию запишется пустая строка )
  var registerElem = function( customTag, doc, parentPrototype, foo ) {
  
    // parentPrototype - прототип от которого будем наследоваться
    // стандартный HtmlElement по умолчанию
    function createProto( parentPrototype ) {
      var parent = parentPrototype || HTMLElement;
      var callback = foo || '';
      // Создаем прототип для аккордеона
      var parentProto = Object.create( parent, {
        
        // Колбэк из параметров запустится при создании элемента
        createdCallback: {
          value: foo
        }
      });
      return parentProto;
    }
    
    // Регистрируем новый элемент в браузере
    function registerElem( customTag, doc, parentPrototype ) {
      // Создаем прототип для элемента при помощи наследования
      var parentProto = createProto( parentPrototype );
      // Регистрируем новый элемент в браузере
      // registerElement возвращает конструктор
      var elem = doc.registerElement( customTag, 
        { prototype: parentProto } );
      // Возвращаем зарегистрированный элемент ( конструктор )
      return elem;
    }
    
    return registerElem( customTag, doc, parentPrototype );
  };
   
  // this - Создаваемый HTML-элемент
  function createShadowRoot() {
    var templates = localDocument.getElementsByTagName( 'template' );
    // Находим шаблон по имени тега, 
    // потому что идентификатор трудно передать в параметры
    var tmpl = templates[ 0 ];
    var root = this.createShadowRoot();
    root.appendChild( tmpl.content.cloneNode( true ) );
  }
  
  // Регистрируем новый элемент в браузере
  var AccordionProto = registerElem( "web-accordion", localDocument,  HTMLDivElement.prototype, createShadowRoot );
  // Создаем элемент
  var accordion = new AccordionProto();
  console.log( accordion );
  // Помещаем его в body
  document.body.appendChild( accordion );
  
  // Здесь будет API
  // this - HTML-элемент
  AccordionProto.prototype.doAnything = function() {
    console.log('something matter...');
    //console.log( this );
  };
  
  // Запускаем функцию
  accordion.doAnything();
})();