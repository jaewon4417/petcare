var gllist = ''
$.ajax({
    type : 'GET',
    url : './gallery.json',
    timeout : 3000,
    beforeSend : function(xhr){
        if (xhr.overrideMimeType) {
            xhr.overrideMimeType('application/json')
        }
    },
    dataType :'json',
    success : function(data){
        gllist = data
        dataPrint()
    },
    error : function(xhr){
        alert(xhr.status + '/' + xhr.errorText)
    }
})

function dataPrint() {

var list = ''
for (var i in gllist) {
    
    list += `<li><div class="imgBox"><img src="${gllist[i].Photo}" onerror="this.src='images/noimage.gif'" alt=""></div>`
    list += `<div class="txtBox"><h3>${gllist[i].Title}</h3></div>`
    list += `<p>${gllist[i].Date}</p></li>`
    
    
}
$('.rvbox').append(`<ul class="list">${list}</ul>`)
}

$('.rvbox').on('click','ul.list li button',function(e){
    e.preventDefault()
    var index = $(this).parent().index()
    gllist.splice(index,1)
    $('ul.list').remove()
    dataPrint()
})

$('.rvbox .pushBtn button').on('click',function(e){
    e.preventDefault()
    $('.formBox').css({display:'block'})
})

$('.rvbox').on('click','.formBox button[type=submit]',function(e){
    e.preventDefault()
    if ($('#title').val()===''&& $('#date').val()==='') {
        
        return false
    }
    var last = {
        Title : $('#title').val(),
        Date : $('#date').val(),
        Story : $('#story').val(),
        Photo : $('#imgsrc').val()

    }
    gllist.push(last)
    $('ul.list').remove()
    dataPrint()
})

$('.rvbox').on('click','.formBox button[type=reset]',function(){
   $('.formBox').css({display:'none'})
})





