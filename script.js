$(document).ready(function() {
    let tabCount = 1;
    const Content= new Array()

    function addTab() {
        const tabID = `${tabCount}`;
        const tabContent= `<div class="tab" id="${tabID}"> New Tab<span class="close-tab">x</span></div>`;
        const input = $(`
        <div class="wrap">
        <div class="search">
           <input type="text" class="searchTerm" placeholder="What are you looking for?">
           <button type="submit" class="searchButton">
             <i class="fa fa-search"></i>
          </button>
          
        </div>
        <iframe class="tab-iframe" src=""></iframe>
     </div>
    `);
    Content.push(input)
    console.log(Content[parseInt(tabID)-1]);
        $('.tabs').append(tabContent);
        $('.content').html(Content[parseInt(tabID)-1]);
        $(`#${tabID}`).trigger('click');
        tabCount++;
    }

    function switchTab(event) {
        
        if($(event.target).attr('class')=='tab'){
            tabId=$(event.target).attr('id');
            $('.content').html(Content[parseInt(tabId)-1]);
            $('.tabs').children().removeClass('active');
            $(event.target).addClass('active')
        }
        else{
            if($(event.target).attr('class')=='close-tab'){
                tabId=$(event.target).parent().attr('id');
                $(`#${tabId}`).remove();
                Content[parseInt(tabId)-1].remove()
                if($('.tabs').length === 0){
                    addTab();  // Add a new tab if all tabs are close
                }
                else{
                    $('.tabs').children().eq([parseInt(tabId)-1]).trigger('click');
                   
                }
                
            }
        }
        
        
    }

    function loadURL(event) {
        if($(event.target).parent().attr('class')=='searchButton'){
        const tabContent = $(`.content`);
        const urlInput = tabContent.find('.searchTerm');
        const iframe = tabContent.find('.tab-iframe');
        const url = urlInput.val();
        iframe.attr('src', url);
        }
    }

    

    
    // Initial setup
    addTab();
    $('.add-tab').on('click', addTab);
    $(`.tabs`).on('click', switchTab);
    $('.content').on('click', loadURL)
});
