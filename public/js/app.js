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
    
    $(document).on("click", ".save", saveArticle);
    $(document).on("click", ".delete", unsaveArticle);
    














});