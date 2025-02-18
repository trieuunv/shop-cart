export const path = {
    login: '/login',

    signUp: '/signup',

    main: '/',

    my: '/my',
    profile: '/my/profile',
    email: '/my/email',

    address: '/my/address',
    addressCreate: '/my/address/create',
    addressUpdate: '/my/address/edit/:id',

    order: '/my/order',
    orderList: '/my/order/:filter', // filter ? 
    orderDetail: '/my/order/detail/:id',

    product: '/product',
    productList: '/product/:filter',
    productDetai: '/product/detail/:id',
    
    checkout: '/checkout',
    checkoutCart: '/checkout/cart',
    checkoutOrder: '/checkout/order',
    checkoutPayment: '/checkout/payment/:id',
}