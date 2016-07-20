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
  
  // Получаем хост-элемент из index.html
  var host = $('#host');
  // Создаем в хосте теневой дом
  var shadowRoot = host[ 0 ].createShadowRoot();
  // Получаем шаблон из accordion.html
  var tpl = localDocument.querySelector('#accordion-tpl');
  // Вставляем его содержимое в теневой дом
  shadowRoot.appendChild( tpl.content );
  // Обязательно удаляем шаблон после использования
  tpl.remove();
  
  // Получаем аккордеон из теневого дома
  var accordion = $( 'body /deep/ #accordion' );
  console.log( accordion );
  
  // Регистрируем новый элемент в браузере
  var AccordionProto = registerElem( 
    "web-accordion", localDocument, HTMLDivElement.prototype );
  
  
  // Здесь будет API
  // this - HTML-элемент
  function doAnything() {
      var header = $(  'body /deep/ item-header' );
      var ctnt   = "item-content";
      // Открываем, закрываем на клик
      header.click(function () {
        // Закрываем все панели
        $( this ).parent().siblings().find( ctnt ).hide();
        // Без этого jQuery разваливает блок на строчки
        $( this ).css( 'display', 'block' );
  
        // Удаляем дефолтный класс open
        if ( $( this ).next().attr( "class" ) === 'open') {
          // Я уже не хочу удалять вообще ничего лишнего
          $( this ).next().removeClass( 'open' );
          // При этом оставляем панель открытой
          $( this ).next().show( 'slow' );
        }
        else {
          // Теперь назначаем для всех панелей переключение
          $( this ).next().toggle( 'slow' );
        }
    });
  }
  
  // Точно так же регистрируем остальные элементы
   var ItemProto = registerElem( 
    "accordion-item", localDocument,  HTMLDivElement.prototype );
   var HeaderProto = registerElem( 
    "item-header", localDocument,  HTMLHeadingElement.prototype );
   var ContentProto = registerElem( 
    "item-content", localDocument,  HTMLParagraphElement.prototype );
  
  // Создаем заголовок
  var title = new HeaderProto();
  
  // Здесь будет API
  // this - HTML-элемент
  HeaderProto.prototype.doAnything = function() {
  };
  
  // Создаем элемент
  var accordion = new AccordionProto();
  // Запускаем функцию
  doAnything();
})();