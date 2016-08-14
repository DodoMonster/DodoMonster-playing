angular.module("productApp", ["increment","ngResource"])
	.constant("baseUrl", "http://localhost:2403/products/")
	.controller("defaultCtrl", function($scope,$http,$resource,baseUrl) {
		$scope.displayMode = "list";
		$scope.currentProduct = null;

	$scope.productsResource = $resource(baseUrl + ":id", {
		id: "@id"
	}); //配置$resource服务

		/*
		author:dodomonster
		time:2016.08.14
		function:获取产品数据
		*/
		$scope.listProduct = function() { 
			// $scope.products = [{
			// 	id: 0,
			// 	name: "Dummy1",
			// 	category: "Test",
			// 	price: 1.25
			// }, {
			// 	id: 1,
			// 	name: "Dummy2",
			// 	category: "Test",
			// 	price: 2.45
			// }, {
			// 	id: 1,
			// 	name: "Dummy3",
			// 	category: "Test",
			// 	price: 4.25
			// }];

			// $http.get(baseUrl).success(function(data) {
			// 	$scope.products = data;
			// });

			$scope.products = $scope.productsResource.query();

		}

		/*
		author:dodomonster
		time:2016.08.14
		function:删除指定产品
		*/
		$scope.deleteProduct = function(product) {
			// $http({
			// 	method:"DELETE",
			// 	url:baseUrl+product.id
			// }).success(function(){
			// 	$scope.products.splice($scope.products.indexOf(product), 1);
			// });		

			product.$delete().then(function(){
				$scope.products.splice($scope.products.indexOf(product), 1);
			});
			$scope.displayMode = "list";	
		}

		/*
		author:dodomonster
		time:2016.08.14
		function:创建新产品
		*/
		$scope.createProduct = function(product) {
			// $http.post(baseUrl,product).success(function(newProduct){
			// 	$scope.products.push(newProduct);
			// 	$scope.displayMode = "list";
			// });			

			new $scope.productsResource(product).$save().then(function(newProduct){
				$scope.products.push(newProduct);
				$scope.displayMode = "list";
			});
		}

		/*
		author:dodomonster
		time:2016.08.14
		function:更新产品
		*/
		$scope.updateProduct = function(product) {
			// $http({
			// 	url:baseUrl+product.id,
			// 	method:post,
			// 	data:product
			// }).success(function(modifiedProduct){
			// 	for (var i = 0, len = $scope.products.length; i < len; i++) {
			// 		if ($scope.products[i].id == product.id) {
			// 			$scope.products[i] = product;
			// 			break;
			// 		}
			// 	}
			// 	$scope.displayMode="list";
			// });

			product.$save();
			$scope.displayMode = "list";
			
		}

		$scope.editOrCreateProduct = function(product) {
			$scope.currentProduct = product ? angular.copy(product) : {};
			$scope.displayMode = "edit";
		}

		$scope.saveEdit = function(product) {
			if (angular.isDefined(product.id)) {
				$scope.updateProduct(product);
			} else {
				$scope.createProduct(product);
			}
		}

		$scope.cancelEdit = function() {
			if($scope.currentProduct && $scope.currentProduct.$get){
				$scope.currentProduct.$get()
			}
			$scope.currentProduct = {};
			$scope.displayMode = "list";
		}

		$scope.listProduct();

	})