#  Inspair calculations and table
Calculations table and input form designed and developed for the [Inspair website](https://inspair.ru/).
May be used as a framework-like base to build similar pages. Form includes:
- Initial input form-scales
- Calculations based on inputs (pure JS)
- Resulting table with new calculated data. 

Build with Gulp.js as the build system. 
##  URLs
RU version: [Inspair website](https://inspair.ru/calc)

ENG version: [GitHub pages](https://lazy-ocean.github.io/inspair-calculations-table/)
##  Local setup
Run local setup using Gulp.
You'll need on your computer:
- Node.js
- Gulp
- npm
### To do
- Setup: `npm i`
- Start a local server: `npm run start`

Running a local server will watch all SASS, JS and HTML, compile and reload accordingly.
- Build: `npm run build`

Build will compile and minify all SASS/CSS, concat and ugliy all JS, and put one minified HTML-file with inlined styles and JS to the `docs` folder.
##  Getting started
All working files are in `src` working directory.
### Components
1. **Form**

Made with HTML `<input type="range">` and is generated in `form.js` with data took from `schema.js`.
To edit input parameters, simply modify data in `schema.js`:
  * `label` will be used in the form as HTML form label
    
  * `type` - preferred HTML `<input type="*">`
    
  * `placeholder` - if you need one in form input field
    
  * `required` - mark mandatory and optional parameters
    
    > Mind that in that version `required` is used as validation as all fields are necessary and all values are preset
    
  * `min` and `max` - border-values of the input slider
  
  * `value` - preset value
  
  * `step` - size of each change/movement of the input slider.
  
Form bubbles are generated in `form.js`, too, and are specified as HTML `<output>`, each for every input. It calculates its value based on a `setBubble()`  (`form.js`).

2. **Table**

All data is calculated in `calculate.js` and then used to build HTML table string in `table.js`.
Table is added to the page using DOM API right after the form is submitted.
Table headers are specified as a premade string, other values are ordered according to it. All values are formatted with `toLocaleString('ru')` - change to set the right language-sensitive formatting based on your language.

3. **Result text**

In this case, the calculations and table were made to find **payback period**: it shows as a result right after the form submitting and table data are just the more detailed parameters for each year.
  * Calculations are made in `calculate.js`
  
  * HTML string is generated in `form.js onSubmit()` function: there you can modify output text. 

> Mind the `formatChunkTimestamp` function of `utils.js`: it helps maintaining plural suffix (*one year/two year**s***) and has advanced version for the more 'volatile' plural suffix forms (as in Russian, Polish and so on).

### Calculations
Detailed info will be added shortly.

### Validation
You can validate user inputs using `validate.js`. For this particular case with input sliders and preset default valid values the data doesn't need additional validation. But if you want to omit the case of invalid data submitting or use other input types (text), modify `validate.js` accordingly. The result of validation is used in `form.js onSubmit()` function. 

### Styles and design
Styles and design made with compliance with [product owner](https://inspair.ru/) main styles.

Basics (colors and font) could be modified using `_variables.scss`. For anything else see `sass/components` folder.
