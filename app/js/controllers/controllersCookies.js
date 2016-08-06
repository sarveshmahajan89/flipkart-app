var phonecatAppControllers =angular.module('phonecatAppControllers', ['ngCookies']);

phonecatAppControllers.controller('HeadListCtrl',['$scope','$http','$location','menSection','mySessionService','$cookieStore',function($scope,$http,$location,menSection,mySessionService,$cookieStore){
        
     //    $http.get('json/men.json').success(function(data) {
    	// $scope.mens = data;
     //    });
		
		menSection.list(function(menSection) {
          $scope.mens = menSection;
        });

        $scope.isVisible = false;
        $scope.isVisible1 = false;
        $scope.isVisible2 = false;
        $scope.showName = mySessionService.showName;
        $scope.showName1 = false;
        $scope.userName = mySessionService.userName;

        if(angular.isUndefined($scope.showName))
        {
        	$scope.showName=false;
        	console.log("is Undefined");
        }
        else
        {
        	console.log($scope.showName);	
        }

        if(angular.isUndefined($scope.userName))
        {
        	$scope.userName="";
        	console.log("userName is Undefined");
        }
        else
        {
        	console.log($scope.userName);	
        }
        //var favoriteCookie = $cookieStore.get(mySessionService.userName);
        //console.log(mySessionService.userName+", "+favoriteCookie);
        //console.log($scope.showName);

        $scope.check = function() {
            //$scope.userName=$scope.userName;
            $scope.userName = mySessionService.userName;
            $scope.showName=!$scope.showName;
            $scope.showName1=$scope.showName;
            alert($scope.userName+", "+$scope.showName);
        };

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

            // $scope.userName = mySessionService.userName;
            // $scope.password = mySessionService.password;

            // $scope.validateLogin=function(){
            // if($scope.userName == "" || $scope.userName == null){
            // 	alert("pls fill the details");
            // }else if($scope.userName == "sar" || $scope.password == "12345"){
            //     $scope.showName = mySessionService.showName = true;
            //     console.log($scope.userName+" "+$scope.showName);
            //     $location.path('/');
                
            // }else{
            // 	$location.path('/');
            // }
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
	$scope.fNameStatus=false;
	$scope.lNameStatus=false;
	$scope.uNameStatus=false;
	$scope.passStatus=false;
	$scope.emailStatus=false;
	$scope.phoneStatus=false;
	$scope.enableSubmit=false;
	$scope.count=0;
	var select = 7;

	$scope.validate = function(type) {
		if(type==0)
             {
             	if($scope.fName=="" || $scope.fName==null)
		             {
		             	$scope.fNameStatus=true;
             			$scope.fName="please enter first name";	
		             }
		             else
		             {
		             	$scope.fNameStatus=false;
		             	$scope.count=$scope.count+1;
		             }
             	
             }
        else if(type==1)
             {
             	if($scope.lName=="" || $scope.lName==null)
		             {
		             	$scope.lNameStatus=true;
		             	$scope.lName="please enter last name";
             		}
             		else
		             {
		             	$scope.lNameStatus=false;
		             	$scope.count=$scope.count+1;
		             }	
             }
        else if(type==2)
             {
             	if($scope.uName=="" || $scope.uName==null)
		             {
		             	$scope.uNameStatus=true;
		             	$scope.uName="please enter user name";
		             }
		             else
		             {
		             	$scope.uNameStatus=false;
		             	$scope.count=$scope.count+1;
		             }	
             }
        else if(type==3)
             {
             	if($scope.pass=="" || $scope.pass==null)
		             {
		             	$scope.passStatus=true;
		             	//$scope.uName="please enter user name";
		             }
		             else
		             {
		             	$scope.passStatus=false;
		             	$scope.count=$scope.count+1;
		             }	
             }
        else if(type==4)
             {
             	if($scope.email=="" || $scope.email==null)
		             {
		             	$scope.emailStatus=true;
		             	$scope.email="please enter email id";
		             	//console.log(email.$error);
		             }
		             else
		             {
		             	$scope.emailStatus=false;
		             	$scope.count=$scope.count+1;
		             }	
             }
        else if(type==5)
             {
             	if($scope.phone=="" || $scope.phone==null)
		             {
		             	$scope.phoneStatus=true;
		             	$scope.phone="please enter number";
		             }
		             else
		             {
		             	$scope.phoneStatus=false;
		             	//console.log(phone.$valid);
		             	$scope.count=$scope.count+1;
		             }	
             }                               
             if($scope.count>5)
             {
             	$scope.enableSubmit=true;
             }
	};
	
    $scope.clearField=function(type,status){

    	if(type==0 && status==true)
    	{
    		$scope.fName="";
    	}
    	else if(type==1 && status==true)
    	{
    		$scope.lName="";
    	}
    	else if(type==2 && status==true)
    	{
    		$scope.uName="";
    	}
    	else if(type==3 && status==true)
    	{
    		$scope.pass="";
    	}
    	else if(type==4 && status==true)
    	{
    		$scope.email="";
    	}
    	else if(type==5 && status==true)
    	{
    		$scope.phone="";
    	}
    }

    $scope.submitForm = function(type) {
    	$location.path("/");
    }
	}]);

   phonecatAppControllers.factory('mySessionService', function($http){
         
      var sessionObj = {};

      return sessionObj;

      });


phonecatAppControllers.controller('logInValidation',['$scope','$http','$location','userLists','mySessionService','$cookieStore', function($scope,$http,$location,userLists,mySessionService,$cookieStore){

userLists.list(function(userLists) {
          $scope.uLists = userLists;
        });

	$scope.userName = mySessionService.userName;
    $scope.password = mySessionService.password;
    $scope.showName = false;

            $scope.validateLogin=function(){
            	
            	//console.log($scope.uLists);
            if($scope.userName == "" || $scope.userName == null){
            	$scope.message="please enter userid and password";
             }

            else{
            	for (var key in $scope.uLists.userDetail) {
            		if ($scope.uLists.userDetail.hasOwnProperty(key)) {
					  var val=$scope.uLists.userDetail[key];
					  	for (var key1 in val) {
	
            				console.log(val.id+" ,"+val.password);
            				if($scope.userName == val.id && $scope.password == val.password){

            					$cookieStore.put($scope.userName,$scope.password);
            					$scope.showName = mySessionService.showName = true;

            					mySessionService.userName=$scope.userName;
    							mySessionService.password=$scope.password;

            					var favoriteCookie = $cookieStore.get(mySessionService.userName);
            					//console.log("pass is:"+favoriteCookie);
            					$location.path('/');
            				}
            				else
            				{
            					$scope.userName="";
            					$scope.password="";
            					$scope.message="Invalid userid and password";
            				}
            			}
            		}
        		}
	}}
}]);

phonecatAppControllers.factory('userLists', function($http){
        return {
          list: function(callback){
            $http.get('json/idList.json').success(callback);
          }
        };
      });