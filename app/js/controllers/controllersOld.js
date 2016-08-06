var phonecatAppControllers =angular.module('phonecatAppControllers', []);

phonecatAppControllers.controller('HeadListCtrl',['$scope','$http','$location','menSection','mySessionService', function($scope,$http,$location,menSection,mySessionService){
        
     //    $http.get('json/men.json').success(function(data) {
    	// $scope.mens = data;
     //    });
		
		menSection.list(function(menSection) {
          $scope.mens = menSection;
        });

        $scope.isVisible = false;
        $scope.isVisible1 = false;
        $scope.isVisible2 = false;
        $scope.showName = false;

        $scope.onEx = function() {
            //$scope.isVisible = !$scope.isVisible;
        	$scope.isVisible = true;
            $scope.isVisible1 = false;
            $scope.isVisible2 = false;
        };
        
        $scope.onHnK = function() {
            $scope.isVisible1 = true;
            $scope.isVisible = false;
            $scope.isVisible2 = false;
        };

        $scope.onMen = function() {
            $scope.isVisible2 = true;
            $scope.isVisible = false;
            $scope.isVisible1 = false;
        };

        $scope.redirect1 = function(){
        	$scope.isVisible = false;
			$location.path("/mobileLists");
        };

        $scope.redirectHome = function(){
        	$scope.isVisible = false;
			$location.path("/");
        };

            $scope.userName = mySessionService.userName;
            $scope.password = mySessionService.password;

            $scope.validateLogin=function(){
            if($scope.userName == "" || $scope.userName == null){
            	alert("pls fill the details");
            }else if($scope.userName == "sar" || $scope.password == "12345"){
                $scope.showName = mySessionService.showName = true;
                console.log($scope.userName+" "+$scope.showName);
                $location.path('/');
                
            }else{
            	$location.path('/');
            }
}
           


}]);

phonecatAppControllers.factory('menSection', function($http){
        return {
          list: function(callback){
            $http.get('json/men.json').success(callback);
          }
        };
      });


phonecatAppControllers.controller('AllMobileListCtrl',['$scope','$http','$filter','mobileSection', function($scope,$http,$filter,mobileSection){
 //    $http.get('json/allMobile.json').success(function(data) {
	// $scope.mobiles = data;

	mobileSection.list(function(mobileSection) {
          $scope.mobiles = mobileSection;

	var brand="";
    var tempBrands = [];
    for (var key in mobileSection.mobiles) {
    	if (mobileSection.mobiles.hasOwnProperty(key)) {
    		tempBrands.push(key);
    	}
    }
    $scope.mobileBrands = tempBrands;
    
    $scope.compFilter = function(company){
    	$scope.mobiles = $filter('CategoryFilter')(mobileSection,company);
    }
    
    $scope.priceFilter = function(range){
    	$scope.mobiles = $filter('MblPriceFilter')(mobileSection,range);
    }

});
}]);

phonecatAppControllers.factory('mobileSection', function($http){
        return {
          list: function(callback){
            $http.get('json/allMobile.json').success(callback);
          }
        };
      });

phonecatAppControllers.filter('CategoryFilter',function(){
	return function(data, filterValue) {
		var dataObj={};
		if(filterValue==="All")
			{
			//console.log("all");
			angular.copy(data,dataObj);
			}
		else
			{
			angular.copy(data,dataObj);
			//console.log("other");
			for (var key in dataObj.mobiles) {
				  if (dataObj.mobiles.hasOwnProperty(key)) {
					  if(filterValue === key){
						  continue;
					  }
					  delete dataObj.mobiles[key]; 
				  }
				}
			}		
		
		return dataObj;

	  }
});

phonecatAppControllers.filter('MblPriceFilter',function(){
	return function(data, range) {
		var dataObj={};
		var priceNum=0;
		if(range==="All")
			{
			console.log("all");
			angular.copy(data,dataObj);
			}
		else
			{
			//console.log("other");
			if(range==="5k")
			{
				console.log("5k");priceNum=5000;
			}
			else if(range==="5k-8k")
			{
				console.log("5k-8k");priceNum=8000;
			}
			else if(range==="8k-10k")
			{
				console.log("8k-10k");priceNum=10000;
			}
			else if(range==="10k-15k")
			{
				console.log("10k-15k");priceNum=15000;
			}
			else if(range==="15k")
			{
				console.log("15k");priceNum=15001;
			}
			
			angular.copy(data,dataObj);
			
			for (var key in dataObj.mobiles) {
				  if (dataObj.mobiles.hasOwnProperty(key)) {
					  var val=dataObj.mobiles[key];
					  for (var key1 in val) {
						  if (val.hasOwnProperty(key1)) {
							  var val1=val[key1];
							  	//console.log(val1.price);
							  	if(val1.price<8000)
							  		{
							  			console.log("check"+val1);
							  			continue;
							  		}
							  		console.log(dataObj.mobiles[key][key1]);
							  		delete dataObj.mobiles[key][key1];
						  }
						}
				  }
				}
			
			
			}		
		
		return dataObj;

	  }
});



phonecatAppControllers.controller('singUpValidation',['$scope','$http','$location', function($scope,$http,$location){
	
	// $scope.changeClass=false;
	// $scope.isError=true;
	// $scope.cssClass = 'noChangeText';
	var select = 7;

	$scope.validate = function(type) {
		     select = type ;
		     

	};
	
	$scope.selected = function (type){
             if(select == type){
             	if(type==0)
             	{
	             	if($scope.fName=="" || $scope.fName==null)
		             {
		             	$scope.fName="please enter first name";	
		             	return false;
		             }
		             else
		             {
		             	return true;
		             }
		         }
		        else if(type==1)
             	{
		             if($scope.lName=="" || $scope.lName==null)
		             {
		             	$scope.lName="please enter last name";	
		             	return false;
		             }
		             else
		             {
		             	return true;
		             }
		         }
		        else if(type==2)
             	{
		             if($scope.uName=="" || $scope.uName==null)
		             {
		             	$scope.uName="please enter user name";
		             	return false;	
		             }
		             else
		             {
		             	return true;
		             }
             	}
             	else if(type==3)
             	{
		             if($scope.pass=="" || $scope.pass==null)
		             {
		             	//$scope.pass="please enter password";	
		             }
             	}
             	else if(type==4)
             	{
		             if($scope.email=="" || $scope.email==null)
		             {
		             	$scope.email="please enter email";
		             	return false;	
		             }
		             else
		             {
		             	return true;
		             }
             	}
             	else if(type==5)
             	{
		             if($scope.phone=="" || $scope.phone==null)
		             {
		             	$scope.phone="please enter phone number";
		             	return false;	
		             }
		             else
		             {
		             	return true;
		             }
             	}
             	//return false;
             }else{
             	//return true;
             }
	};	      


            //$scope.isVisible = !$scope.isVisible;
            // if($scope.fName=="" || $scope.fName==null)
            // {
            // 	$scope.fName="please enter first name";	
            // 	$scope.isError=false;
            // 	//$scope.cssClass = true ? 'noChangeText' : 'changeText';
            // }
        	
        //};


    $scope.clearField=function(type){
    	if(type==0)
    	{
    		$scope.fName="";
    	}
    	else if(type==1)
    	{
    		$scope.lName="";
    	}
    	else if(type==2)
    	{
    		$scope.uName="";
    	}
    	else if(type==3)
    	{
    		$scope.pass="";
    	}
    	else if(type==4)
    	{
    		$scope.email="";
    	}
    	else if(type==5)
    	{
    		$scope.phone="";
    	}
    }
	}]);

   phonecatAppControllers.factory('mySessionService', function($http){
         
      var sessionObj = {};

      return sessionObj;

      });
