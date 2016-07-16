(function() {
  
  var localDocument = document.currentScript.ownerDocument;
  
  // CUSTOM ELEMENTS
  
  var registerElem = function( customTag, doc, parentPrototype ) {
  
    // parentPrototype - прототип от которого будем наследоваться
    // стандартный tmlElement по умолчанию
    function createProto( parentPrototype ) {
      var parent = parentPrototype || HTMLElement;
      // Создаем прототип для аккордеона
      var parentProto = Object.create( parent, {
        
        // Колбэк запустится при создании элемента
        createdCallback: {
          value: function() {
              alert( this );
            }
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
  
  // Регистрируем новый элемент в браузере
  var AccordionProto = registerElem( "web-accordion", localDocument,  HTMLDivElement.prototype );
 
  
  // Создаем элемент
  var accordion = new AccordionProto();
  console.log( accordion );
  
  // Помещаем его в body
  document.body.appendChild( accordion );
  
  // Здесь будет API
  // this - HTML-элемент
  AccordionProto.prototype.foo = function() {
    console.log('foo() called');
    console.log( this );
  };
  
  // Запускаем функцию
  accordion.foo();
})();