$(document).ready(function(){

    $(".button-collapse").sideNav();
    
    function saveArticle(){

            
            let id = $(this).attr("id");
        
            $.ajax({
                url: "/save/"+id,
                method:"PUT",
            }).done(function(response){

                    Materialize.toast(response.result, 4000);
                    this.tooltip("remove");
                    this.parent().remove();
            }.bind($(this)));
    }
    
    function unsaveArticle(){

            let id = $(this).attr("id");
        
            $.ajax({
                url: "/unsave/"+id,
                method:"PUT",
            }).done(function(response){

                    Materialize.toast(response.result, 4000);
                    this.tooltip("remove");
                    this.parent().remove();
            }.bind($(this)));


    }
    
    function showCommentModal(){
         var articleId = $(this).attr("id")
         $("#submitComment").attr("data-article", articleId);
         $.get("/article_comment/"+articleId, function(data){
             
                for(let i =0 ; i<data.comments.length;i++){
                    
                        $(".article_comments").append(`<li class="collection-item"><p>${data.comments[i].text}</p><a class="btn btn-floating deleteComment savedBtn" data-articleId=${articleId} data-comment=${data.comments[i]._id}><i class="material-icons ">delete</i></a></li>`);
                }
                $(".modal").modal("open");
         });
        

    }
    
    function saveComment(e){
            e.preventDefault();
            var input = {
                    text: $("#commentField").val().trim()
            }
            var articleId = $(this).attr("data-article");
            $.post("/comment/"+articleId, input).done(function(data){
                    console.log(data);
                    Materialize.toast(data.result, 4500);
                    $(".article_comments").append(`<li class="collection-item"><p>${data.comment.text}</p><a class="btn btn-floating deleteComment savedBtn" data-articleId=${articleId} data-comment=${data.comment._id}><i class="material-icons ">delete</i></a></li>`);
                    $("#commentField").val("");
                       
            });

    }
    
//    function hideCommentModal(e){
//            e.preventDefault();
//            
//            $(".modal").modal("close");
//    }
    function hideModal(){

            $(".article_comments").empty();
    }
    function deleteComment(){
            
            var commentId = $(this).attr("data-comment");
            var articleId = $(this).attr("data-articleId");
            $.ajax({
                
                url:"/comment/"+commentId+"/"+articleId,
                method: "DELETE",
                
                
            }).done(function(data){
                    
                    Materialize.toast(data.result, 4000);
                    this.tooltip("remove");
                    this.parent().remove();
                
            }.bind($(this)));

    }
    $(".modal").modal({

        complete: hideModal()
    });
    $(document).on("click", ".save", saveArticle);
    $(document).on("click", ".delete", unsaveArticle);
    $(document).on("click", ".addComment", showCommentModal);
    $(document).on("click", ".saveComment", saveComment);
    $(document).on("click", ".deleteComment", deleteComment);
    $(document).on("click", ".closeModal", hideCommentModal);

});