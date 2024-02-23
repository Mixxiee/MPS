/**
* Template Name: NiceAdmin
* Updated: Aug 30 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    toolbar_sticky_offset: isSmallScreen ? 102 : 108,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_class_list: [{
        title: 'None',
        value: ''
      },
      {
        title: 'Some class',
        value: 'class-name'
      }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    templates: [{
        title: 'New Table',
        description: 'creates a new table',
        content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
      },
      {
        title: 'Starting my story',
        description: 'A cure for writers block',
        content: 'Once upon a time...'
      },
      {
        title: 'New list with dates',
        description: 'New List with dates',
        content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
      }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable);
    
  })

// Initialize a table with a different placeholder
  document.addEventListener('DOMContentLoaded', function () {
    const datatables = document.querySelectorAll('.datatable');
    datatables.forEach(function (table) {
        const searchInput = table.closest('.table-responsive').querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.placeholder = 'Filter';
        }
    });
});

// Initialize a table with search bar disabled
document.addEventListener("DOMContentLoaded", function () {
  const tablesWithoutSearch = document.querySelectorAll('.datatable-without-search');
  tablesWithoutSearch.forEach(table => {
    new simpleDatatables.DataTable(table, {
      searchable: false,
      perPage: 5
    });
  });
});

// submit button trigger
document.addEventListener('DOMContentLoaded', function() {
  // Get reference to the submit button
  const submitButton = document.getElementById('submit-button');
  // Get reference to all input fields
  const inputFields = document.querySelectorAll('.input-borders');

  // Function to check if any input field has value
  function checkInputFields() {
      return Array.from(inputFields).some(function(input) {
          return input.value.trim() !== '';
      });
  }

  // Function to enable or disable submit button
  function updateSubmitButton() {
      submitButton.disabled = !checkInputFields();
  }

  // Add input event listener to each input field
  inputFields.forEach(function(inputField) {
      inputField.addEventListener('input', function() {
          // Enable or disable the submit button based on whether any input field has value
          updateSubmitButton();
      });
  });


 // test

 
 document.addEventListener('DOMContentLoaded', function() {
  const formTable1 = document.getElementById('form-aanvrager');
  const formTable2 = document.getElementById('form-aanvraag');
  const tableContainer = document.getElementById('table-container');
  const submitButton = document.getElementById('submit-button');

  // Add input event listeners to enable/disable submit button
  const inputFields1 = formTable1.querySelectorAll('.input-borders');
  const inputFields2 = formTable2.querySelectorAll('.input-borders');

  inputFields1.forEach(function(inputField) {
      inputField.addEventListener('input', function() {
          updateSubmitButton(formTable1);
      });
  });

  inputFields2.forEach(function(inputField) {
      inputField.addEventListener('input', function() {
          updateSubmitButton(formTable2);
      });
  });

  // Function to check if any input field in the form has value
  function checkInputFields(form) {
      const inputFields = form.querySelectorAll('.input-borders');
      return Array.from(inputFields).some(function(input) {
          return input.value.trim() !== '';
      });
  }

  // Function to enable or disable submit button based on input field values
  function updateSubmitButton(form) {
      submitButton.disabled = !checkInputFields(form);
  }

    formTable1.addEventListener('submit', function(event) {
        event.preventDefault();
        displayTable1();
    });

    formTable2.addEventListener('submit', function(event) {
        event.preventDefault();
        displayTable2();
    });

    function displayTable1() {
        const table1HTML = `
            <div class="table-responsive">
                <table class="table tablenl table-striped table-hover datatable">
                    <!-- Table 1 content -->
                </table>
            </div>
        `;
        tableContainer.innerHTML = table1HTML;
        // Populate Table 1 with sample data
        // You can replace this with your actual table content
        const table1 = document.querySelector('.table-container .table');
        table1.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">Achternaam</th>
                    <th scope="col">Voornaam</th>
                    <th scope="col">Geboortedatum</th>
                    <th scope="col">Nationaliteit</th>
                    <th scope="col">Adres</th>
                </tr>
            </thead>
            <tbody>
                <!-- Table 1 rows -->
            </tbody>
        `;
        // Add sample rows to Table 1
        for (let i = 0; i < 5; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="personalinfo.html">OSPINA</a></td>
                <td><a href="personalinfo.html">DANIEL</a></td>
                <td>11/12/2000</td>
                <td>COLOMBIAANESE</td>
                <td>WEG NAAR WESTPUNT 18</td>
            `;
            table1.querySelector('tbody').appendChild(row);
        }
    }

    function displayTable2() {
        const table2HTML = `
            <div class="table-responsive">
                <table class="table tablenl table-striped table-hover datatable">
                    <!-- Table 2 content -->
                </table>
            </div>
        `;
        tableContainer.innerHTML = table2HTML;
        // Populate Table 2 with sample data
        // You can replace this with your actual table content
        const table2 = document.querySelector('.table-container .table');
        table2.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">Aanvraag Nummer</th>
                    <th scope="col">Online Nummer</th>
                    <th scope="col">Achternaam</th>
                    <th scope="col">Voornaam</th>
                    <th scope="col">Geboortedatum</th>
                    <th scope="col">Hoofddoel</th>
                </tr>
            </thead>
            <tbody>
                <!-- Table 2 rows -->
            </tbody>
        `;
        // Add sample rows to Table 2
        for (let i = 0; i < 5; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="aanvragen.html">8001000914</a></td>
                <td><a href="aanvragen.html">8001000914</a></td>
                <td><a href="personalinfo.html">OSPINA</a></td>
                <td><a href="personalinfo.html">DANIEL</a></td>
                <td>11/12/2000</td>
                <td>EERST</td>
            `;
            table2.querySelector('tbody').appendChild(row);
        }
    }
});
 

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function() {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

  // Initialize a collapsing a section

  document.addEventListener('DOMContentLoaded', function () {
    const toggleCollapseElements = document.querySelectorAll('.toggle-collapse');
    toggleCollapseElements.forEach(function (element) {
        element.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-bs-target');
            const target = document.querySelector(targetId);
            const offsetTop = target.offsetTop;

            if (target.classList.contains('show')) {
                target.classList.remove('show');
            } else {
                target.classList.add('show');
            }

            
            this.classList.toggle('font-bold');

            
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

   // Initialize collapse trigger
   const radioButtons = document.querySelectorAll('.collapse-trigger');
   radioButtons.forEach(function(button) {
       button.addEventListener('click', function() {
           const targetId = this.getAttribute('data-target');
           const collapsibleSections = document.querySelectorAll('.collapse');
           collapsibleSections.forEach(function(section) {
               if (section.id !== targetId) {
                   section.classList.remove('show');
               }
           });

           // Clear input fields
           inputFields.forEach(function(input) {
               input.value = ''; // Reset input field value to empty
           });

           // Update submit button state after clearing input fields
           updateSubmitButton();
       });
   });
});

  // Close current tab
function closeCurrentTab() {
  window.close(); 
}

  // Confirmation prompt
  document.getElementById('saveButton').addEventListener('click', function() {
    if (confirm("Weet je zeker dat je dit commentaar wilt opslaan?")) {
      // If the user confirms, submit the form or perform other actions
      // For example, you can submit the form using JavaScript:
      // document.getElementById('yourFormId').submit();
    } else {
      
    }
  });



})();