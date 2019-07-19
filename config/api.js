
// var NewApiRootUrl = 'https://www.djdghz.com/api/';
// var NewApiRootUrl = 'https://www.djdghz.com/api/';

var NewApiRootUrl = 'http://127.0.0.1:8082/sell/';
module.exports = {
    IndexUrl: NewApiRootUrl + 'buyer/product/list', //首页数据接口
    CatalogList: NewApiRootUrl + 'catalog/index',  //分类目录全部分类数据接口
    CatalogCurrent: NewApiRootUrl + 'catalog/current',  //分类目录当前分类数据接口

    AuthLoginByWeixin: NewApiRootUrl + 'buyer/login', //微信登录
    AuthLogoutByWeixin: NewApiRootUrl + 'buyer/logout', //微信登出

    GoodsCount: NewApiRootUrl + 'goods/count',  //统计商品总数
    GoodsList: NewApiRootUrl + 'goods/list',  //获得商品列表
    GoodsCategory: NewApiRootUrl + 'goods/category',  //获得分类数据
  GoodsDetail: NewApiRootUrl + 'buyer/product/detail',  //获得商品的详情
    GoodsNew: NewApiRootUrl + 'goods/new',  //新品
    GoodsHot: NewApiRootUrl + 'goods/hot',  //热门
    GoodsRelated: NewApiRootUrl + 'goods/related',  //商品详情页的关联商品（大家都在看）

    BrandList: NewApiRootUrl + 'brand/list',  //品牌列表
    BrandDetail: NewApiRootUrl + 'brand/detail',  //品牌详情

    CartList: NewApiRootUrl + 'buyer/car/list', //获取购物车的数据
    CartAdd: NewApiRootUrl + 'buyer/car/add', // 添加商品到购物车
  CartUpdate: NewApiRootUrl + 'buyer/car/update', // 更新购物车的商品
    CartDelete: NewApiRootUrl + 'car/delete', // 删除购物车的商品
    CartChecked: NewApiRootUrl + 'car/checked', // 选择或取消选择商品
    CartGoodsCount: NewApiRootUrl + 'car/goodscount', // 获取购物车商品件数
    CartCheckout: NewApiRootUrl + 'car/checkout', // 下单前信息确认

    OrderSubmit: NewApiRootUrl + 'buyer/order/submit', // 提交订单
    PayPrepayId: NewApiRootUrl + 'pay/prepay', //获取微信统一下单prepay_id

    CollectList: NewApiRootUrl + 'collect/list',  //收藏列表
    CollectAddOrDelete: NewApiRootUrl + 'collect/addordelete',  //添加或取消收藏

    CommentList: NewApiRootUrl + 'comment/list',  //评论列表
    CommentCount: NewApiRootUrl + 'comment/count',  //评论总数
    CommentPost: NewApiRootUrl + 'comment/post',   //发表评论

    TopicList: NewApiRootUrl + 'topic/list',  //专题列表
    TopicDetail: NewApiRootUrl + 'topic/detail',  //专题详情
    TopicRelated: NewApiRootUrl + 'topic/related',  //相关专题

    SearchIndex: NewApiRootUrl + 'search/index',  //搜索页面数据
    SearchResult: NewApiRootUrl + 'search/result',  //搜索数据
    SearchHelper: NewApiRootUrl + 'search/helper',  //搜索帮助
    SearchClearHistory: NewApiRootUrl + 'search/clearhistory',  //搜索帮助

    AddressList: NewApiRootUrl + 'buyer/address/list',  //收货地址列表
    AddressDetail: NewApiRootUrl + 'address/detail',  //收货地址详情
    AddressSave: NewApiRootUrl + 'address/save',  //保存收货地址
    AddressDelete: NewApiRootUrl + 'address/delete',  //删除收货地址

    RegionList: NewApiRootUrl + 'region/list',  //获取区域列表

    OrderList: NewApiRootUrl + 'buyer/order/list',  //订单列表
    UnpaidList: NewApiRootUrl + 'order/unpaidlist',  //未付款列表
    WaitReceiptList: NewApiRootUrl + 'order/waitreceiptList',  //等待收货列表
    ReceivedGoodList: NewApiRootUrl + 'order/receivedgoodlist',  //已经收货列表
    DeliverGoodList: NewApiRootUrl + 'order/delivergoodlist',  //等待发货列表
    OrderDetail: NewApiRootUrl + 'buyer/order/detail',  //订单详情
    OrderCancel: NewApiRootUrl + 'order/cancel',  //取消订单

    FootprintList: NewApiRootUrl + 'footprint/list',  //足迹列表
    FootprintDelete: NewApiRootUrl + 'footprint/delete',  //删除足迹
    
    Deduction: NewApiRootUrl + 'deduction/getDeduction',   //查找积分
    AddDeduction: NewApiRootUrl + 'deduction/addDeduction',  //获取积分
    moveDeduction: NewApiRootUrl + 'deduction/moveDeduction'  //扣除积分
};