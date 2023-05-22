(function (global) {
  var ns = {};

  var homeHtml = "snippets/Main_Home.html";
  var allCategoriesUrl = "data/catalog.json";
  var categoriesTitleHtml = "snippets/Category_Title.html";
  var categoryHtml = "snippets/Category_Item.html";

  var catalogItemsUrl = "data/categories/";
  var catalogItemsTitleHtml = "snippets/Product_Title.html";
  var catalogItemHtml = "snippets/Product_Item.html";

  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  var showLoading = function (selector) {
    var html =
      "<div class='lds-center'>"+
      "<div id='loading' class='lds-roller'>" +
      "<div></div>" +
      "<div></div>" +
      "<div></div>" +
      "<div></div>" +
      "<div></div>" +
      "<div></div>" +
      "<div></div>" +
      "<div></div>" +
      "</div></div>";
    insertHtml(selector, html);
  };

  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  document.addEventListener("DOMContentLoaded", function (event) {
    showLoading("#Main_Home");
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        document.querySelector("#Main_Home").innerHTML = responseText;
      },
      false
    );
  });

  ns.loadCatalogCategories = function () {
    showLoading("#Main_Home");
    $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
  };

  ns.loadHome = function () {
    showLoading("#Main_Home");
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        switchHomeToActive();
        document.querySelector("#Main_Home").innerHTML = responseText;
      },
      false
    );
  };

  function buildAndShowCategoriesHTML(categories) {
    $ajaxUtils.sendGetRequest(
      categoriesTitleHtml,
      function (categoriesTitleHtml) {
        $ajaxUtils.sendGetRequest(
          categoryHtml,
          function (categoryHTML) {
            switchCatalogToActive();
            var categoriesViewHtml = buildCategoriesViewHtml(
              categories,
              categoriesTitleHtml,
              categoryHTML
            );
            insertHtml("#Main_Home", categoriesViewHtml);
          },
          false
        );
      },
      false
    );
  }

  function buildCategoriesViewHtml(
    categories,
    categoriesTitleHtml,
    categoryHtml
  ) {
    var finalHTML = categoriesTitleHtml;
    finalHTML += "<div class='container p-0'>";
    finalHTML += "<section class='row'>";
    for (var i = 0; i < categories.length; i++) {
      var html = categoryHtml;
      var name = "" + categories[i].name;
      var short_name = categories[i].short_name;
      html = insertProperty(html, "name", name);
      html = insertProperty(html, "short_name", short_name);
      finalHTML += html;
    }
    finalHTML += "</section>";
    finalHTML += "</div>";
    return finalHTML;
  }

  ns.loadCatalogItems = function (categoryShort) {
    showLoading("#Main_Home");
    $ajaxUtils.sendGetRequest(
      catalogItemsUrl + categoryShort + ".json",
      buildAndShowCatalogItemsHTML
    );
  };

  function buildAndShowCatalogItemsHTML(categoryCatalogItems) {
    $ajaxUtils.sendGetRequest(
      catalogItemsTitleHtml,
      function (catalogItemTitleHtml) {
        $ajaxUtils.sendGetRequest(
          catalogItemHtml,
          function (catalogItemHtml) {
            switchCatalogToActive();
            var catalogItemsViewHtml = buildCatalogItemsViewHtml(
              categoryCatalogItems,
              catalogItemTitleHtml,
              catalogItemHtml
            );
            insertHtml("#Main_Home", catalogItemsViewHtml);
          },
          false
        );
      },
      false
    );
  }

  function buildCatalogItemsViewHtml(
    categoryCatalogItems,
    catalogItemsTitleHtml,
    catalogItemHtml
  ) {
    catalogItemsTitleHtml = insertProperty(
      catalogItemsTitleHtml,
      "name",
      categoryCatalogItems.category.name
    );

    catalogItemsTitleHtml = insertProperty(
      catalogItemsTitleHtml,
      "special_instructions",
      categoryCatalogItems.category.special_instructions
    );

    var finalHtml = catalogItemsTitleHtml;

    finalHtml += "<div class='container p-0'>";
    finalHtml += "<section class='row'>";

    var catalogItems = categoryCatalogItems.catalog_items;
    var catShort_name = categoryCatalogItems.category.short_name;
    for (var i = 0; i < catalogItems.length; i++) {
      var html = catalogItemHtml;

      html = insertProperty(html, "short_name", catalogItems[i].short_name);

      html = insertProperty(html, "catShort_name", catShort_name);

      html = insertItemPrice(
        html,
        "price_retail",
        catalogItems[i].price_retail
      );

      html = insertItemAmount(
        html,
        "amount_retail",
        catalogItems[i].amount_retail
      );

      html = insertItemPrice(
        html,
        "price_wholesale",
        catalogItems[i].price_wholesale
      );

      html = insertItemAmount(
        html,
        "amount_wholesale",
        catalogItems[i].amount_wholesale
      );

      html = insertProperty(html, "name", catalogItems[i].name);

      html = insertProperty(html, "description", catalogItems[i].description);

      finalHtml += html;
    }

    finalHtml += "</section>";
    finalHtml += "</div>";
    return finalHtml;
  }

  function insertItemPrice(html, pricePropName, priceValue) {
    if (!priceValue) {
      return insertProperty(html, pricePropName, "");
    }
    priceValue = "$" + priceValue.toFixed(2);
    html = insertProperty(html, pricePropName, priceValue);
    return html;
  }

  function insertItemAmount(html, amountPropName, amountValue) {
    if (!amountValue) {
      return insertProperty(html, amountPropName, "");
    }
    amountValue = "(" + amountValue + ")";
    html = insertProperty(html, amountPropName, amountValue);
    return html;
  }

  var switchCatalogToActive = function () {
    var classes = document.querySelector("#Nav_LinkHome").className;
    classes = classes.replace(new RegExp("active", "g"), "");
    document.querySelector("#Nav_LinkHome").className = classes;

    classes = document.querySelector("#Nav_LinkCategory").className;
    if (classes.indexOf("active") === -1) {
      classes += " active";
      document.querySelector("#Nav_LinkCategory").className = classes;
    }
  };

  var switchHomeToActive = function () {
    var classes = document.querySelector("#Nav_LinkCategory").className;
    classes = classes.replace(new RegExp("active", "g"), "");
    document.querySelector("#Nav_LinkCategory").className = classes;

    classes = document.querySelector("#Nav_LinkHome").className;
    if (classes.indexOf("active") === -1) {
      classes += " active";
      document.querySelector("#Nav_LinkHome").className = classes;
    }
  };

  ns.loadSpecials = function (categoryShort) {
    showLoading("#Main_Home");
    var randomCategoriesJSON = ["A", "B", "C", "D"].find(
      (_, i, ar) => Math.random() < 1 / (ar.length - i)
    );
    $ajaxUtils.sendGetRequest(
      catalogItemsUrl + randomCategoriesJSON + ".json",
      buildAndShowCatalogItemsHTML
    );
  };

  global.$ns = ns;
})(window);
