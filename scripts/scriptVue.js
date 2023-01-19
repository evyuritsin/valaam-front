var app = new Vue({
  el: '#app',
  data: {
    searchProgramTitle: 'ПОИСК ТУРА НА ВАЛААМ',
    findProgramInputs: {
      name: '',
      phone: '',
      error: '',
      visible: {
        show: false,
        hide: true
      },
    },
    findListVisible: {
      findList_show: false,
      findList_hide: true,
      findListBtnShow: 'Показать ещё',
    },
    motorShipsVisible: {
      motorShipslist_show: false,
      motorShipslist_hide: true,
      motorShipsBtnShow: 'Показать ещё',
    },
    servicesVisible: {
      servicesList_show: false,
      servicesList_hide: true,
      servicesBtnShow: 'Показать ещё',
    },
    excursionsVisible: {
      excursionsList_show: false,
      excursionsList_hide: true,
      excursionsBtnShow: 'Показать ещё',      
    }, 
    groupProgInputs: {
      name: '',
      phone: '',
      email: '',
      timecall: '',
      personeData: '',
      mailingNews: '',
      error: '',
      visible: {
        show: false,
        hide: true,
      },      
    },
    regUrInputs: {
      visible: {
        show: false,
        hide: true,        
      },      
      agent: '',
      fio: '',
      email: '',
      phone: '',
      name: '',
      inn: '',
      kpp: '',
      adressUr: '',
      fax: '',
      rasChet: '',
      nameBank: '',
      bik: '',
      korChetBank: '',
      phoneBank: '',
      adressDilivery: '',
      payNds: '',
      sendInfo: '',
      news: '',
      error: '',
    },
    reviews: {
      nameUser: '',
      starsCount: '',
      comment: '',
      fotos: '',
      infoTrue: false,
      visible: {
        showFlex: false,
        hide: true,
      },      
    },
  },

  methods: {
    findListShowClick: function (event) {
      if (this.findListVisible.findList_show === true) {
        this.findListVisible.findList_show = false;
        this.findListVisible.findList_hide = true;
        this.findListVisible.findListBtnShow = 'Показать ещё';
      } else {
        this.findListVisible.findList_show = true;
        this.findListVisible.findList_hide = false;
        this.findListVisible.findListBtnShow = 'Скрыть';      
      }

    },
    motorShipsShowClick: function (event) {
      if (this.motorShipsVisible.motorShipslist_show === true) {
        this.motorShipsVisible.motorShipslist_show = false;
        this.motorShipsVisible.motorShipslist_hide = true;
        this.motorShipsVisible.motorShipsBtnShow = 'Показать ещё';
      } else {
        this.motorShipsVisible.motorShipslist_show = true;
        this.motorShipsVisible.motorShipslist_hide = false;
        this.motorShipsVisible.motorShipsBtnShow = 'Скрыть';      
      }

    },
    servicesShowClick: function (event) {
      if (this.servicesVisible.servicesList_show === true) {
        this.servicesVisible.servicesList_show = false;
        this.servicesVisible.servicesList_hide = true;
        this.servicesVisible.servicesBtnShow = 'Показать ещё';
      } else {
        this.servicesVisible.servicesList_show = true;
        this.servicesVisible.servicesList_hide = false;
        this.servicesVisible.servicesBtnShow = 'Скрыть';      
      }

    },
    excursionsShowClick: function (event) {
      if (this.excursionsVisible.excursionsList_show === true) {
        this.excursionsVisible.excursionsList_show = false;
        this.excursionsVisible.excursionsList_hide = true;
        this.excursionsVisible.excursionsBtnShow = 'Показать ещё';
      } else {
        this.excursionsVisible.excursionsList_show = true;
        this.excursionsVisible.excursionsList_hide = false;
        this.excursionsVisible.excursionsBtnShow = 'Скрыть';      
      }
    },       
    findProgramClick: function (event) {
      if (this.findProgramInputs.name === '' || this.findProgramInputs.phone === '') {
        this.findProgramInputs.error = 'Введите имя и(или) телефон.';
        this.findProgramInputs.visible.show = true;
        this.findProgramInputs.visible.hide = false;        
      }
      if (this.findProgramInputs.name != '' || this.findProgramInputs.phone != '') {
        this.findProgramInputs.visible.show = false;
        this.findProgramInputs.visible.hide = true;
      }
    },
    groupProgInputsClick: function (event) {
      if (this.groupProgInputs.name === '' || 
          this.groupProgInputs.phone === '' ||
          this.groupProgInputs.email === '' ||
          this.groupProgInputs.timecall === '' ||
          this.groupProgInputs.personeData === '' ||
          this.groupProgInputs.mailingNews === ''
          ) {
        this.groupProgInputs.error = 'Заполните все поля.';
        this.groupProgInputs.visible.show = true;
        this.groupProgInputs.visible.hide = false;       
      }

      if (this.groupProgInputs.name !== '' || 
          this.groupProgInputs.phone !== '' ||
          this.groupProgInputs.email !== '' ||
          this.groupProgInputs.timecall !== '' ||
          this.groupProgInputs.personeData !== '' ||
          this.groupProgInputs.mailingNews !== ''
          ) {
        this.groupProgInputs.visible.show = false;
        this.groupProgInputs.visible.hide = true;         
      }      
    },
    regUrInputsClick: function (event) {
      var empty = false;
      for (var key in this.regUrInputs) {
        if (this.regUrInputs[key] === '') {
          empty = true;
        } else {
          empty = false;
        }
      }
      if (empty) {
        this.regUrInputs.visible.show = true;
        this.regUrInputs.visible.hide = false;
        this.regUrInputs.error = 'Не все поля были заполнены.';    
      } else {
        this.regUrInputs.visible.show = false;
        this.regUrInputs.visible.hide = true;      
      }
    },
    reviewsVisibleClick: function (event) {
      if (this.reviews.visible.showFlex) {
        this.reviews.visible.showFlex = false;
        this.reviews.visible.hide = true;
      } else {
        this.reviews.visible.showFlex = true;
        this.reviews.visible.hide = false;
      }
    },
    fotoFiles: function (event) {
      this.reviews.fotos = event.target.files;
    },
    starsValue: function (event) {
      this.starsCount = event.target.value;
      console.log(event.target);
    },
    starsClick: function (event) {
      //console.log(event.target.attributes.class.nodeValue);
    },    
    sendReview: function (event) {
      this.reviews.starsCount = this.$refs.starsCount.getAttribute('count')
      console.log(this.reviews);
    },
  },
});
var index = new Vue({
  el: '#index',
  data: {
    popularsVisible: {
      popularsList_show: false,
      popularsList_hide: true,
      popularsBtnShow: 'Показать ещё',       
    },
    findProgramInputs: {
      name: '',
      phone: '',
      error: '',
      visible: {
        show: false,
        hide: true
      },
    },
  },
  methods: {
    popularsShowClick: function (event) {
      if (this.popularsVisible.popularsList_show === true) {
        this.popularsVisible.popularsList_show = false;
        this.popularsVisible.popularsList_hide = true;
        this.popularsVisible.popularsBtnShow = 'Показать ещё';
      } else {
        this.popularsVisible.popularsList_show = true;
        this.popularsVisible.popularsList_hide = false;
        this.popularsVisible.popularsBtnShow = 'Скрыть';      
      }
    },
    findProgramClick: function (event) {
      if (this.findProgramInputs.name === '' || this.findProgramInputs.phone === '') {
        this.findProgramInputs.error = 'Введите имя и(или) телефон.';
        this.findProgramInputs.visible.show = true;
        this.findProgramInputs.visible.hide = false;        
      }
      if (this.findProgramInputs.name != '' || this.findProgramInputs.phone != '') {
        this.findProgramInputs.visible.show = false;
        this.findProgramInputs.visible.hide = true;
      }
    },
  },
});