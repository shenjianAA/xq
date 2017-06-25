var app=angular.module("kfl",["ng","ngRoute"]);
//配置路由词典
app.config(function($routeProvider){
    $routeProvider.when("/kflStart",{templateUrl:"tpl/start.html"})
                    .when("/kflMain",{templateUrl:"tpl/main.html",controller:'mainCtrl'})
                    .when("/kflDetail/:did",{templateUrl:"tpl/detail.html",controller:"detailCtrl"})
                    .when("/kflOrder/:did",{templateUrl:"tpl/order.html",controller:"orderCtrl"})
                    .when("/kflMyOrder",{templateUrl:"tpl/myOrder.html",controller:"myorderCtrl"})
                    .otherwise({redirectTo:"/kflStart"});
});


//创建控制器,封装了跳转的方法
app.run(function($http){
    $http.defaults.headers.post={
        "Content-Type":"application/x-www-form-urlencoded"
    };
});
app.controller("parentCtrl",["$scope","$location","$http","$httpParamSerializer",function($scope,$location,$http,$httpParamSerializer){
    $scope.jump=function(despath){
        var u=sessionStorage["u"];
        if(true){
            $location.path(despath);
        }else{
            alert("请登录");
        }
    };
    //注册
    $scope.reg=function(){
        //摸态框显示
        var reg=document.getElementById("modal-reg");
        reg.style.display="block";
        //关闭按钮
        var close=document.querySelector(".close");
        $scope.close=function(){
            reg.style.display="none";
        }
        //点击注册按钮
        $scope.btnreg=function(){
            var obj={uname:$scope.uname,upwd:$scope.upwd};
            var result=$httpParamSerializer(obj);
            console.log($scope.uname+""+$scope.upwd);
            $http.post("data/register.php",result)
            .success(function(data){
                    console.log(data);
                    if(data.msg=="success"){
                        alert("注册成功");
                        reg.style.display="none";
                        var log=document.getElementById("modal-log");
                        log.style.display="block";
                    }else{
                        alert("注册失败");
                    }
                });
        }
    }
    //登录
    $scope.log=function(){
        //摸态框显示
        var log=document.getElementById("modal-log");
        log.style.display="block";
        //关闭按钮
        var close=document.querySelector(".close");
        $scope.close=function(){
            log.style.display="none";
        }
    }
    //点击登录按钮
    $scope.btnlog=function(){
        var obj={uname:$scope.uname,upwd:$scope.upwd};
        console.log($scope.uname+""+$scope.upwd);
        var url="data/login.php?uname="+$scope.uname+"&upwd="+$scope.upwd;
        $http.get(url)
            .success(function(data){
                console.log(data);
                if(data.msg=="success"){
                    alert("登录成功");
                    sessionStorage["u"]=$scope.uname;
                    var log=document.getElementById("modal-log");
                    log.style.display="none";
                }else{
                    alert("登录失败");
                }
            });
    }
}]);

//创建控制器 mainCtrl
app.controller("mainCtrl",["$scope","$http",function($scope,$http){
    $scope.hasMore=true;
    //加载代码片段 进到处理器处理函数 发起请求 拿到数据
    $http.get("data/dish_getbypage.php?start=0").success(function(data){
        //console.log(data);
        $scope.dishList=data;
        //监听用户输入关键词
        $scope.$watch("kw",function(){
            console.log($scope.kw);
           if($scope.kw){
               $http.get("data/dish_getbykw.php?kw="+$scope.kw)
                   .success(function(data){
                       console.log(data);
                       //搜索是有结果的
                       if(data.length>0){
                           //将搜索到的结果显示在main页面的列表上
                           $scope.dishList=data;
                       }
                   });
           }
        });

        //加载更多
        $scope.loadMore=function(){
            $http.get("data/dish_getbypage.php?start="+$scope.dishList.length)
            .success(function(data){
                    console.log(data);
                    if(data.length<5){
                        //没有更多数据：将按钮隐藏掉显示一个提示
                        $scope.hasMore=false;
                    }
                    //将数组拼起来保存在dishLish中
                    $scope.dishList=$scope.dishList.concat(data);
                });
        }
    });
}]);

//创建控制器 detailCtrl
app.controller("detailCtrl",["$scope","$http","$routeParams",function($scope,$http,$routeParams){
    console.log($routeParams.did);
    $http.get("data/dish_getbyid.php?did="+$routeParams.did)
    .success(function(data){
            console.log(data);
            $scope.detailList=data;
        });
}]);
app.run(function($http){
    $http.defaults.headers.post={
        "Content-Type":"application/x-www-form-urlencoded"
    }
});
//创建orderCtrl
app.controller("orderCtrl",["$http","$routeParams","$scope","$httpParamSerializer",function($http,$routeParams,$scope,$httpParamSerializer){
    console.log($routeParams.did);
    $scope.result=true;
    $scope.submitOrder=function(){
        //获取用户输入的各个信息
        //将输入信息发送给服务器
        //解析服务端返回结果
        var obj={userName:$scope.userName,sex:$scope.sex,phone:$scope.phone,addr:$scope.addr,did:$routeParams.did};
        var str=$httpParamSerializer(obj);
        console.log($scope.userName+" "+$scope.sex+" "+$scope.phone+" "+$scope.addr);
        $http.post("data/order_add.php",str)
        .success(function(data){
                console.log(data);
                if(data.msg=="success"){
                    $scope.result=false;
                    $scope.msg="收藏成功，收藏编号为"+data.oid;
                    sessionStorage["phone"]=$scope.phone;
                }else{
                    $scope.result=false;
                    $scope.msg="订单提交失败"
                }
            });
    }

}]);
app.controller("myorderCtrl",["$scope","$http",function($scope,$http){
    var phone=sessionStorage["phone"];
    $http.get("data/order_getbyphone.php?phone="+phone)
        .success(function(data){
            console.log(data);
            $scope.myOrder=data;
        });

}]);
