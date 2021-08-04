# .My keep
<p align="center">
  <img alt="Todos application image" src="https://raw.githubusercontent.com/OctupusPrime/portfolio/master/src/assets/img/work2.png">
</p>  

## Installation Setup

```bash
# clone code
git clone https://github.com/OctupusPrime/my-keep-v2.git

# go to folder
cd my-keep-v2

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start
```  

If you dont want install [**Live demo**](https://octupusprime.github.io/my-keep-v2/)  
## Description  

This application contains of fully responsible table of notes. *Inspired by [Google keep](https://keep.google.com/).*   
### Key features : 
* **Saving notes to vuex**;
* **Convenient gui** _for (add, edit, delete) notes_;
* **Shuffling notes** _(Drag and drop functionality is fully implemented)_;
* **Have trash car** if you unintentionally deleted note;
* **Change color for every note**;
* **Adaptable for any device**;
* **Have dark theme**;
* **Have list mode**;

## Documentation
### Plugins
| Name | Usage |
| --- | --- |
| [jquery](https://www.npmjs.com/package/jquery) | Used to jquery syntax |
| [vue-resize](https://www.npmjs.com/package/vue-resize) | Used to detect element size change |
| [vue-textarea-autosize](https://www.npmjs.com/package/vue-textarea-autosize) | Used to create autosize textareas |
### Folders
* #### img
    Contains off all images for app.
* #### js
    **app**   
    Contains plugins and initializations vue.
* #### less
    Contains off all styles for app.
* #### vue
   * **components**
   Contains off all components for applicaton, if prefix contains of block its for it fuctionality.
   * **pages**
     * doc - Used for app information;
     * home - Used for app itself contains off addaptive table;
     * trask - Used for init deleted notes for future (recovery/delete).
   * **intex**
   Contains off all global components and router-view.
* #### gulpfile
    Used to init app collector for hot reloads and build bunde off app.
#### Bugs  
Cursor not *grub* when pick note;   
Litle flashing when note change place;  
### Authors
[**Misha Sokil**](https://github.com/OctupusPrime)
### License
 MIT © Misha Sokil

**Thank you for your attention**
  
