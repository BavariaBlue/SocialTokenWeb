var donationAmount = 0;
var homelessAddress = 0;
var shoppingCart = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
var bindFunctions = false;

App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    return await App.initWeb3();
  },

  initWeb3: async function () {

    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      $("div.noMetaMask").show();
      $('.btn-switchDonorView').attr('disabled', true);
      $('.btn-switchHomelessView').attr('disabled', true);
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Social.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var SocialArtifact = data;
      App.contracts.Social = TruffleContract(SocialArtifact);

      // Set the provider for our contract
      App.contracts.Social.setProvider(App.web3Provider);

      // const rp = require('request-promise');
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log(error);
        }
        var account = accounts[0];

        App.contracts.Social.deployed().then(function (instance) {
          socialInstance = instance;
          return socialInstance.balanceOf.call(account);
        }).then(async function (balance) {

          //get current balance of tokens of account
          document.querySelector("currentBalance").textContent = balance;
          document.querySelector("addressHomeless1").textContent = '0x96c65A2b5Ef50bc13f227A1f3c285e5045a4664B';
          document.querySelector("addressHomeless2").textContent = '0x9Ea5cB0a3162a50BF5cdd694451A21B557b1967D';
          document.querySelector("addressHomeless3").textContent = '0x30DFf58C12349297fea380A95B59211367dE8e72';
          document.querySelector("ownedSocialTokens1").textContent = await socialInstance.balanceOf.call('0x96c65A2b5Ef50bc13f227A1f3c285e5045a4664B');
          document.querySelector("ownedSocialTokens2").textContent = await socialInstance.balanceOf.call('0x9Ea5cB0a3162a50BF5cdd694451A21B557b1967D');
          document.querySelector("ownedSocialTokens3").textContent = await socialInstance.balanceOf.call('0x30DFf58C12349297fea380A95B59211367dE8e72');
          document.querySelector("spenderBalance").textContent = balance;
          document.querySelector("spenderAddress").textContent = account;

          if (balance < 25000) {
            $("div.hintLowTokenAmount").show();
          }
          else {
            $("div.hintLowTokenAmount").hide();
          }

          $('.btn-donateToken').attr('disabled', true);

          var itemRow = $('#itemRow');
          itemRow.empty();
          var itemTemplate = $('#itemTemplate');

          var itemTemplate1 = itemTemplate.clone();
          itemTemplate1.find('.panel-title').text("Sausage salad");
          itemTemplate1.find('.itemPrice').text("1,499 ST");
          itemTemplate1.find('.btn-number').attr('data-field', "quant[1]");
          itemTemplate1.find('.input-number').attr('name', "quant[1]");
          itemTemplate1.find('.input-number').attr('data-name', "Sausage salad");
          itemTemplate1.find('.input-number').attr('data-price', 1499);
          itemTemplate1.find('.input-number').attr('data-id', 1);
          itemTemplate1.find('img').attr('src', "images/items/sausageSalad.png")
          itemTemplate1.removeClass('hidden');

          var itemTemplate2 = itemTemplate.clone();
          itemTemplate2.find('.panel-title').text("Chocolate bar");
          itemTemplate2.find('.itemPrice').text("399 ST");
          itemTemplate2.find('.input-number').attr('name', "quant[2]");
          itemTemplate2.find('.btn-number').attr('data-field', "quant[2]");
          itemTemplate2.find('.input-number').attr('data-name', "Chocolate bar");
          itemTemplate2.find('.input-number').attr('data-price', 399);
          itemTemplate2.find('.input-number').attr('data-id', 2);
          itemTemplate2.find('img').attr('src', "images/items/chocolateBar.png")
          itemTemplate2.removeClass('hidden');

          var itemTemplate3 = itemTemplate.clone();
          itemTemplate3.find('.panel-title').text("Apple");
          itemTemplate3.find('.itemPrice').text("349 ST");
          itemTemplate3.find('.input-number').attr('name', "quant[3]");
          itemTemplate3.find('.btn-number').attr('data-field', "quant[3]");
          itemTemplate3.find('.input-number').attr('data-name', "Apple");
          itemTemplate3.find('.input-number').attr('data-price', 349);
          itemTemplate3.find('.input-number').attr('data-id', 3);
          itemTemplate3.find('img').attr('src', "images/items/apple.png")
          itemTemplate3.removeClass('hidden');

          var itemTemplate4 = itemTemplate.clone();
          itemTemplate4.find('.panel-title').text("Pasta salad");
          itemTemplate4.find('.itemPrice').text("1,299 ST");
          itemTemplate4.find('.input-number').attr('name', "quant[4]");
          itemTemplate4.find('.btn-number').attr('data-field', "quant[4]");
          itemTemplate4.find('.input-number').attr('data-name', "Pasta salad");
          itemTemplate4.find('.input-number').attr('data-price', 1299);
          itemTemplate4.find('.input-number').attr('data-id', 4);
          itemTemplate4.find('img').attr('src', "images/items/pastaSalad.png")
          itemTemplate4.removeClass('hidden');

          var itemTemplate5 = itemTemplate.clone();
          itemTemplate5.find('.panel-title').text("Bun");
          itemTemplate5.find('.itemPrice').text("249 ST");
          itemTemplate5.find('.input-number').attr('name', "quant[5]");
          itemTemplate5.find('.btn-number').attr('data-field', "quant[5]");
          itemTemplate5.find('.input-number').attr('data-name', "Bun");
          itemTemplate5.find('.input-number').attr('data-price', 249);
          itemTemplate5.find('.input-number').attr('data-id', 5);
          itemTemplate5.find('img').attr('src', "images/items/bun.png")
          itemTemplate5.removeClass('hidden');

          var itemTemplate6 = itemTemplate.clone();
          itemTemplate6.find('.panel-title').text("Hummus");
          itemTemplate6.find('.itemPrice').text("999 ST");
          itemTemplate6.find('.input-number').attr('name', "quant[6]");
          itemTemplate6.find('.btn-number').attr('data-field', "quant[6]");
          itemTemplate6.find('.input-number').attr('data-name', "Hummus");
          itemTemplate6.find('.input-number').attr('data-price', 999);
          itemTemplate6.find('.input-number').attr('data-id', 6);
          itemTemplate6.find('img').attr('src', "images/items/hummus.png")
          itemTemplate6.removeClass('hidden');

          var itemTemplate7 = itemTemplate.clone();
          itemTemplate7.find('.panel-title').text("Tomatoes");
          itemTemplate7.find('.itemPrice').text("399 ST");
          itemTemplate7.find('.input-number').attr('name', "quant[7]");
          itemTemplate7.find('.btn-number').attr('data-field', "quant[7]");
          itemTemplate7.find('.input-number').attr('data-name', "Tomatoes");
          itemTemplate7.find('.input-number').attr('data-price', 399);
          itemTemplate7.find('.input-number').attr('data-id', 7);
          itemTemplate7.find('img').attr('src', "images/items/tomato.png")
          itemTemplate7.removeClass('hidden');

          var itemTemplate8 = itemTemplate.clone();
          itemTemplate8.find('.panel-title').text("Spring water");
          itemTemplate8.find('.itemPrice').text("449 ST");
          itemTemplate8.find('.input-number').attr('name', "quant[8]");
          itemTemplate8.find('.btn-number').attr('data-field', "quant[8]");
          itemTemplate8.find('.input-number').attr('data-name', "Spring water");
          itemTemplate8.find('.input-number').attr('data-price', 449);
          itemTemplate8.find('.input-number').attr('data-id', 8);
          itemTemplate8.find('img').attr('src', "images/items/springWater.png")
          itemTemplate8.removeClass('hidden');

          var itemTemplate9 = itemTemplate.clone();
          itemTemplate9.find('.panel-title').text("Tissues");
          itemTemplate9.find('.itemPrice').text("199 ST");
          itemTemplate9.find('.input-number').attr('name', "quant[9]");
          itemTemplate9.find('.btn-number').attr('data-field', "quant[9]");
          itemTemplate9.find('.input-number').attr('data-name', "Tissues");
          itemTemplate9.find('.input-number').attr('data-price', 199);
          itemTemplate9.find('.input-number').attr('data-id', 9);
          itemTemplate9.find('img').attr('src', "images/items/tissues.png")
          itemTemplate9.removeClass('hidden');

          itemRow.append(itemTemplate1.html() + itemTemplate2.html() + itemTemplate3.html() + itemTemplate4.html() + itemTemplate5.html() + itemTemplate6.html() + itemTemplate7.html() + itemTemplate8.html() + itemTemplate9.html());
        })
      });
      if (!bindFunctions) {
        bindFunctions = true;
        return App.bindEvents();
      }
    });
  },

  bindEvents: function () {
    $(document).on('click', '.btn-switchDonorView', App.changeToDonorView);
    $(document).on('click', '.btn-switchHomelessView', App.changeToHomelessView);
    $(document).on('click', '.btn-switchHomeView', App.changeToHomeView);
    $(document).on('click', '.btn-PurchaseToken', App.purchaseToken);
    $(document).on('click', '.btn-donateToken', App.donateToken);
    $(document).on('click', '.btn-number', App.numberChanger);
    $(document).on('focusin', '.input-number', App.focusInNumber);
    $(document).on('change', '.input-number', App.changeInput);
    $(document).on('keydown', '.input-number', App.keydownAction);
    $(document).on('click', '.btn-buyItems', App.spendToken);

    $('input:radio[name="selectAmountEuro"]').change(
      function () {
        if ($(this).is(':checked')) {
          console.log(this.value);
          if (this.value == 0) {
            document.querySelector("euroAmount").textContent = 0;
            document.getElementById("otherAmount").disabled = false;
            document.getElementById("otherAmount").value = 10000;
            var tokenNumber = parseFloat(document.getElementById("otherAmount").value);

            document.querySelector("euroAmount").textContent = tokenNumber / 1000;
            document.querySelector("tokenAmount").textContent = tokenNumber;
            document.querySelector("ethAmount").textContent = (tokenNumber * 0.00000624).toFixed(5);

          } else {
            document.querySelector("euroAmount").textContent = this.value;
            document.querySelector("tokenAmount").textContent = this.value * 1000;
            document.querySelector("ethAmount").textContent = (this.value * 1000 * 0.00000624).toFixed(5);
          }
        }
        $("div.euroAmountSelected").show();
      }
    );
    document.getElementById('otherAmount').oninput = function () {
      var tokenNumber = parseFloat(document.getElementById("otherAmount").value);

      document.querySelector("euroAmount").textContent = tokenNumber / 1000;
      document.querySelector("tokenAmount").textContent = tokenNumber;
      document.querySelector("ethAmount").textContent = (tokenNumber * 0.00000624).toFixed(5);
    }

    // query amount to be donated
    document.getElementById('numberOfDonatedTokens').oninput = function () {
      donationAmount = parseFloat(document.getElementById("numberOfDonatedTokens").value);
      if (homelessAddress != '0') {
        $('.btn-donateToken').attr('disabled', false);
      }
    }
    // query which homless to get donated 
    $('input:radio[name="selectHomeless"]').change(
      function () {
        if ($(this).is(':checked')) {
          if (this.value == 0) {
            // non-examplary homeless
            homelessAddress = document.getElementById("addressOfHomeless").value;
          }
          // examplary homeless
          else if (this.value == 1) {
            homelessAddress = document.querySelector("addressHomeless1").textContent;
          } else if (this.value == 2) {
            homelessAddress = document.querySelector("addressHomeless2").textContent;
          } else if (this.value == 3) {
            homelessAddress = document.querySelector("addressHomeless3").textContent;
          }
          if (donationAmount != '0') {
            $('.btn-donateToken').attr('disabled', false);
          }
        }
      }
    );
    document.getElementById('addressOfHomeless').oninput = function () {
      homelessAddress = document.getElementById("addressOfHomeless").value;
      if (donationAmount != '0') {
        $('.btn-donateToken').attr('disabled', false);
      }
    }

  },

  changeToDonorView: function () {
    $("div.home").hide();
    $("div.viewHomeless").hide();
    $("div.transactionPending").hide();
    $("div.viewDonor").show();
    document.getElementById("initial").checked = true;
    $("div.euroAmountSelected").show();
    document.querySelector("euroAmount").textContent = 1;
    document.querySelector("tokenAmount").textContent = 1 * 1000;
    document.querySelector("ethAmount").textContent = (1 * 1000 * 0.00000624).toFixed(5);
    App.updateBalances();
  },

  changeToHomelessView: function () {
    $("div.home").hide();
    $("div.viewHomeless").show();
    $("div.viewDonor").hide();
    $("div.transactionPending").hide();
    App.updateBalances();
  },

  changeToHomeView: function () {
    $("div.home").show();
    $("div.viewHomeless").hide();
    $("div.viewDonor").hide();
    $("div.transactionPending").hide();
    App.updateBalances();

  },

  updateBalances: function () {
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Social.deployed().then(function (instance) {
        socialInstance = instance;
        return socialInstance.balanceOf.call(account);
      }).then(async function (balance) {
        document.querySelector("currentBalance").textContent = balance;
        document.querySelector("ownedSocialTokens1").textContent = await socialInstance.balanceOf.call('0x96c65A2b5Ef50bc13f227A1f3c285e5045a4664B');
        document.querySelector("ownedSocialTokens2").textContent = await socialInstance.balanceOf.call('0x9Ea5cB0a3162a50BF5cdd694451A21B557b1967D');
        document.querySelector("ownedSocialTokens3").textContent = await socialInstance.balanceOf.call('0x30DFf58C12349297fea380A95B59211367dE8e72');
        document.querySelector("spenderBalance").textContent = balance;
      });
    });
  },

  purchaseToken: function () {
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Social.deployed().then(function (instance) {
        socialInstance = instance;
        return socialInstance.buyToken(document.querySelector("tokenAmount").textContent, {
          from: account,
          value: parseInt(document.querySelector("tokenAmount").textContent * 0.00000624 * 1000000000000000000)
        });
      }).then(function () {
        $("div.transactionPending").show();
        App.updateBalances();
        $('html,body').animate({
          scrollTop: 0
        }, 500);
        //reload
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },

  donateToken: function () {
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Social.deployed().then(function (instance) {
        socialInstance = instance;
        return socialInstance.donateToken(donationAmount, homelessAddress, {
          from: account,
        });
      }).then(function (result) {
        $("div.transactionPending").show();
        App.updateBalances();
        $('html,body').animate({
          scrollTop: 0
        }, 500);
        //reload
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },

  numberChanger: function (e) {
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
      if (type == 'minus') {
        if (currentVal > input.attr('min')) {
          input.val(currentVal - 1).change();
        }
        if (parseInt(input.val()) == input.attr('min')) {
          $(this).attr('disabled', true);
        }
      } else if (type == 'plus') {
        if (currentVal < input.attr('max')) {
          input.val(currentVal + 1).change();
        }
        if (parseInt(input.val()) == input.attr('max')) {
          $(this).attr('disabled', true);
        }
      }
    } else {
      input.val(0);
    }
  },

  focusInNumber: function () {
    $(this).data('oldValue', $(this).val());
  },

  changeInput: function () {
    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    var itemName = $(this).attr('data-name');
    var itemPrice = $(this).attr('data-price');
    var itemId = $(this).attr('data-id');
    var valueFinal = valueCurrent;

    // + and - functionality
    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
      $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
      alert('Sorry, the minimum value was reached');
      $(this).val($(this).data('oldValue'));
      valueFinal = $(this).data('oldValue');
    }
    if (valueCurrent <= maxValue) {
      $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
      alert('Sorry, the maximum value was reached');
      $(this).val($(this).data('oldValue'));
      valueFinal = $(this).data('oldValue');
    }
    // write item name, price, and amount in cart
    shoppingCart[itemId - 1] = [itemName, itemPrice * valueFinal, valueFinal];
    App.changeBasket();
  },

  changeBasket: function () {
    // generate basketTemplates
    var basketRow = $('#basketRow');
    basketRow.empty();
    var basketTemplate = $('#basketTemplate');

    // array into html for each shoppingCart position
    shoppingCart.forEach(position => {
      if (position[2] != 0) {
        var basketTemplate1 = basketTemplate.clone();
        basketTemplate1.find('.itemName').text(position[0]);
        basketTemplate1.find('.itemPrice').text(position[1]);
        basketTemplate1.find('.itemAmount').text(position[2]);
        basketTemplate1.removeClass('hidden');
        basketRow.append(basketTemplate1.html());
      } else {
        // amount == 0, thus hide basketTemplateX
      }
    });

    // calculate sum of complete purchase and display above Buy button
    var sum = 0;
    shoppingCart.forEach(position => {
      sum += position[1];
    });

    if (sum == 0) {
      $("div.emptyBasket").show();
      $('.btn-buyItems').attr('disabled', true);
    } else {
      $("div.emptyBasket").hide();
      $('.btn-buyItems').attr('disabled', false);
    }

    if (parseInt(document.querySelector("spenderBalance").textContent) < sum) {
      $('.btn-buyItems').attr('disabled', true);
      $("div.notEnoughFunds").show();
    } else {
      $("div.notEnoughFunds").hide();
    }

    $('.btn-buyItems').attr('data-sum', sum);
    document.querySelector("tokenSumOfPurchase").textContent = sum;
  },

  keydownAction: function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  },

  spendToken: function (event) {
    event.preventDefault();
    var sum = parseInt($(event.target).data('sum'));
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Social.deployed().then(function (instance) {
        socialInstance = instance;
        return socialInstance.spendToken(sum, '0x96c65A2b5Ef50bc13f227A1f3c285e5045a4664B', {
          from: account
        });
      }).then(function (result) {
        shoppingCart = [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ];
        App.changeBasket();
        App.initContract();
        $("div.transactionPending").show();
        App.updateBalances();
        $('html,body').animate({
          scrollTop: 0
        }, 500);
        //reload
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },
};
$(function () {
  $(window).load(function () {
    App.init();
  });
});
