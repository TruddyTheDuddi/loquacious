// Auto-height for posts

    // Text write resize:
    function textareaAutoResizeIni(){
        var tx = document.getElementsByTagName('textarea');
        for (var i = 0; i < tx.length; i++) {
            var padding = getComputedStyle(tx[i]).paddingBottom;
            var padding = padding.split("px");

            tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight - 2*Number(padding[0])) + 'px;overflow-y:hidden;');
            tx[i].addEventListener("input", OnInput, false);
        }
    }

    function OnInput() {
        var padding = getComputedStyle(this).paddingBottom;
        var padding = padding.split("px");
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight - 2*Number(padding[0])) + 'px';
    }

    // Call this function when exectuing ajax!
    textareaAutoResizeIni();
    
    
// function textareaObj(el){

//     // Stock each element
//     this.element = el;
//     this.textarea = el.querySelector('#text_editor');
//     this.boldBtn = el.querySelector('#bold_btn');
//     this.lastposition_start = this.textarea.value.length;
//     this.lastposition_end = this.textarea.value.length;
//     this.charsToInster = "";

//     // Create Keydown listener
//     this.textarea.addEventListener('keyup' , storeSelectedPosition => {
//         this.lastposition_start = this.textarea.selectionStart;
//         this.lastposition_end = this.textarea.selectionEnd;
//         console.log("Select start: "+this.lastposition_end+"\nSelect end: "+this.lastposition_start);
//     });
//     // Create MouseOut listener
//     this.textarea.addEventListener('mouseout' , storeSelectedPosition => {
//         this.lastposition_start = this.textarea.selectionStart;
//         this.lastposition_end = this.textarea.selectionEnd;
//         console.log("Select start: "+this.lastposition_end+"\nSelect end: "+this.lastposition_start);
//     });

//     // Buttons
//     this.boldBtn.addEventListener('click', storeSelectedPosition => {
//         if (this.lastposition_start == this.lastposition_end){
//             this.textarea.value = this.textarea.value.substring(0, this.lastposition_start)+ "****" +this.textarea.value.substring(this.lastposition_end);
//             console.log("Simple add");
//         } else {
//             this.textarea.value = this.textarea.value.substring(0, this.lastposition_start)+ "**" +this.textarea.value.substring(this.lastposition_start, this.lastposition_end)+ "**" +this.textarea.value.substring(this.lastposition_end);
//             console.log("Add bold to selected");
//         }

//         this.lastposition_start += 2;
//         this.lastposition_end += 2;
//         this.textarea.focus();
//         this.textarea.setSelectionRange(this.lastposition_start, this.lastposition_end);
//         console.log("Apply bold at selection start: "+this.lastposition_end+" and selectction end: "+this.lastposition_start);
//     });

// }

// let t1 = new textareaObj(document.getElementById('editor_box'));
// let t2 = new textareaObj(document.getElementById('editor_box2'));

class textareaNew{

    constructor(el){
        // Stock each element
        this.element = el;
        this.textarea = el.querySelector('#text_editor');
        this.boldBtn = el.querySelector('#bold_btn');
        this.italicBtn = el.querySelector('#italic');
        this.bigtxt = el.querySelector('#big_text');
        this.lastposition_start = this.textarea.value.length;
        this.lastposition_end = this.textarea.value.length;

        // Event listeners
        this.textarea.addEventListener('keyup', f1 => {this.storeSelectedPosition()});
        this.textarea.addEventListener('mouseout', f1 => {this.storeSelectedPosition()});

        // Buttons
        this.boldBtn.addEventListener('click', btn1 => {this.insertChar("**")});
        this.italicBtn.addEventListener('click', btn2 => {this.insertChar("__")});
        this.bigtxt.addEventListener('click', btn3 => {this.addNewLine(">")});
    }

    // Selected text save
    storeSelectedPosition() {
        this.lastposition_start = this.textarea.selectionStart;
        this.lastposition_end = this.textarea.selectionEnd;
        console.log("Select start: "+this.lastposition_end+"\nSelect end: "+this.lastposition_start);
    }

    // Set the character by button
    insertChar(char) {

        //var newText = this.textarea.value.substring(0, this.lastposition_start) +" "+ char +this.textarea.value.substring(this.lastposition_start, this.lastposition_end)+ char +" "+ this.textarea.value.substring(this.lastposition_end);

        //this.textarea.select();
        //document.execCommand('selectAll', false);
        //document.execCommand('insertText', false, newText);

        this.textarea.value = this.textarea.value.substring(0, this.lastposition_start) + char +this.textarea.value.substring(this.lastposition_start, this.lastposition_end)+ char + this.textarea.value.substring(this.lastposition_end);

        this.lastposition_start += char.length;
        this.lastposition_end += char.length;

        this.textarea.focus();
        this.textarea.setSelectionRange(this.lastposition_start, this.lastposition_end);
        console.log("Apply bold at selection start: "+this.lastposition_end+" and selectction end: "+this.lastposition_start);
    }

    // Add char at new line
    addNewLine(char) {

        this.textarea.value = this.textarea.value.substring(0, this.lastposition_start) + "\n" + char + " " + this.textarea.value.substring(this.lastposition_start, this.lastposition_end) + "\n" + this.textarea.value.substring(this.lastposition_end);

        this.lastposition_start += 3;
        this.lastposition_end += 3;

        this.textarea.focus();
        this.textarea.setSelectionRange(this.lastposition_start, this.lastposition_end);
        console.log("Apply bold at selection start: "+this.lastposition_end+" and selectction end: "+this.lastposition_start);
        
        this.OnInputFormatting(this.textarea);
    }

    OnInputFormatting(t) {
        var padding = getComputedStyle(t).paddingBottom;
        var padding = padding.split("px");
        t.style.height = 'auto';
        t.style.height = (t.scrollHeight - 2*Number(padding[0])) + 'px';
    }

}

let t1 = new textareaNew(document.getElementById('editor_box'));
let t2 = new textareaNew(document.getElementById('editor_box2'));
