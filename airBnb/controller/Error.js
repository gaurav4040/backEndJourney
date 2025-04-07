exports.notFoundPage=(req,res,next)=>{
    res.status(404).render('404Error',{
        pageTitle:'page not found',
        currentPage:'error',
        isLoggedIn:req.isLoggedIn
    })
};
