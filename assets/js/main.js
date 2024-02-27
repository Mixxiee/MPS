/**
 * Template Name: NiceAdmin
 * Updated: Aug 30 2023 with Bootstrap v5.3.1
 * Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Sidebar toggle
   */
  if (select(".toggle-sidebar-btn")) {
    on("click", ".toggle-sidebar-btn", function (e) {
      select("body").classList.toggle("toggle-sidebar");
    });
  }

  /**
   * Search bar toggle
   */
  if (select(".search-bar-toggle")) {
    on("click", ".search-bar-toggle", function (e) {
      select(".search-bar").classList.toggle("search-bar-show");
    });
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  /**
   * Initiate quill editors
   */
  if (select(".quill-editor-default")) {
    new Quill(".quill-editor-default", {
      theme: "snow",
    });
  }

  if (select(".quill-editor-bubble")) {
    new Quill(".quill-editor-bubble", {
      theme: "bubble",
    });
  }

  if (select(".quill-editor-full")) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [
            {
              font: [],
            },
            {
              size: [],
            },
          ],
          ["bold", "italic", "underline", "strike"],
          [
            {
              color: [],
            },
            {
              background: [],
            },
          ],
          [
            {
              script: "super",
            },
            {
              script: "sub",
            },
          ],
          [
            {
              list: "ordered",
            },
            {
              list: "bullet",
            },
            {
              indent: "-1",
            },
            {
              indent: "+1",
            },
          ],
          [
            "direction",
            {
              align: [],
            },
          ],
          ["link", "image", "video"],
          ["clean"],
        ],
      },
      theme: "snow",
    });
  }

  /**
   * Initiate TinyMCE Editor
   */
  const useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isSmallScreen = window.matchMedia("(max-width: 1023.5px)").matches;

  tinymce.init({
    selector: "textarea.tinymce-editor",
    plugins: "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
    editimage_cors_hosts: ["picsum.photos"],
    menubar: "file edit view insert format tools table help",
    toolbar:
      "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
    toolbar_sticky: true,
    toolbar_sticky_offset: isSmallScreen ? 102 : 108,
    autosave_ask_before_unload: true,
    autosave_interval: "30s",
    autosave_prefix: "{path}{query}-{id}-",
    autosave_restore_when_empty: false,
    autosave_retention: "2m",
    image_advtab: true,
    link_list: [
      {
        title: "My page 1",
        value: "https://www.tiny.cloud",
      },
      {
        title: "My page 2",
        value: "http://www.moxiecode.com",
      },
    ],
    image_list: [
      {
        title: "My page 1",
        value: "https://www.tiny.cloud",
      },
      {
        title: "My page 2",
        value: "http://www.moxiecode.com",
      },
    ],
    image_class_list: [
      {
        title: "None",
        value: "",
      },
      {
        title: "Some class",
        value: "class-name",
      },
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === "file") {
        callback("https://www.google.com/logos/google.jpg", {
          text: "My text",
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === "image") {
        callback("https://www.google.com/logos/google.jpg", {
          alt: "My alt text",
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === "media") {
        callback("movie.mp4", {
          source2: "alt.ogg",
          poster: "https://www.google.com/logos/google.jpg",
        });
      }
    },
    templates: [
      {
        title: "New Table",
        description: "creates a new table",
        content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
      },
      {
        title: "Starting my story",
        description: "A cure for writers block",
        content: "Once upon a time...",
      },
      {
        title: "New list with dates",
        description: "New List with dates",
        content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
      },
    ],
    template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
    template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
    noneditable_class: "mceNonEditable",
    toolbar_mode: "sliding",
    contextmenu: "link image table",
    skin: useDarkMode ? "oxide-dark" : "oxide",
    content_css: useDarkMode ? "dark" : "default",
    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(needsValidation).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  /**
   * Initiate Datatables
   */
  const datatables = select(".datatable", true);
  datatables.forEach((datatable) => {
    new simpleDatatables.DataTable(datatable);
  });

  // Initialize a table with a different placeholder
  document.addEventListener("DOMContentLoaded", function () {
    const datatables = document.querySelectorAll(".datatable");
    datatables.forEach(function (table) {
      const searchInput = table.closest(".table-responsive").querySelector('input[type="search"]');
      if (searchInput) {
        searchInput.placeholder = "Filter";
      }
    });
  });

  // Initialize a table with search bar disabled
  document.addEventListener("DOMContentLoaded", function () {
    const tablesWithoutSearch = document.querySelectorAll(".datatable-without-search");
    tablesWithoutSearch.forEach((table) => {
      new simpleDatatables.DataTable(table, {
        searchable: false,
        perPage: 5,
      });
    });
  });

  /**
   * Autoresize echart charts
   */
  const mainContainer = select("#main");
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function () {
        select(".echart", true).forEach((getEchart) => {
          echarts.getInstanceByDom(getEchart).resize();
        });
      }).observe(mainContainer);
    }, 200);
  }

  // Close current tab
  function closeCurrentTab() {
    window.close();
  }

  // Confirmation prompt

  const saveButton = document.getElementById("saveButton");

  if (saveButton) {
    saveButton.addEventListener("click", function () {
      if (confirm("Weet je zeker dat je dit commentaar wilt opslaan?")) {
        // If the user confirms, submit the form.
        // For example, document.getElementById('yourFormId').submit();
      } else {
      }
    });
  }
})();

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
                this.classList.remove('font-bold'); // Remove font-bold class when collapsing
            } else {
                target.classList.add('show');
                this.classList.add('font-bold'); // Add font-bold class when expanding
            }

            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Function to collapse the specified section
    function collapseSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            if (section.classList.contains('show')) {
                section.classList.remove('show');
                // Remove font-bold class when collapsing
                const toggleButton = document.querySelector(`[data-bs-target="${sectionId}"]`);
                if (toggleButton) {
                    toggleButton.classList.remove('font-bold');
                }
            }
        }
    }

    // Function to handle collapsing Beschikking section
    const collapseBeschikkingButton = document.getElementById('collapseBeschikkingButton');
    if (collapseBeschikkingButton) {
        collapseBeschikkingButton.addEventListener('click', function () {
            collapseSection('#tableCollapse');
        });
    }

    // Function to handle collapsing Advies section
    const collapseAdviesButton = document.getElementById('collapseAdviesButton');
    if (collapseAdviesButton) {
        collapseAdviesButton.addEventListener('click', function () {
            collapseSection('#sectiontCollapse');
        });
    }
});



/**
 * Submit button/Radio button handlers
 */
document.addEventListener("DOMContentLoaded", () => {
  const radioButtons = document.querySelectorAll('#radio__wrapper input[type="radio"]');
  const description = document.querySelectorAll("#sector_descriptions");
  const submitButton = document.getElementById("submit-button");
  const radioEl = document.querySelectorAll('.fieldsWrapper input[type="radio"]');
  const sectionElements = document.querySelectorAll(".collapsable__section");
  const cancelButton = document.getElementById("cancel__button");
  const cancelButtonDestination = document.querySelectorAll(".datatable-pagination");
  const cancelButtonOriginalLocation = document.querySelector(".cancel-button-original-location");
  const sessionStorage = window.sessionStorage;

  let originalSubmitButtonParent;

  // Function to move cancel button to its original location
  function moveCancelButtonBack() {
    cancelButtonOriginalLocation.appendChild(cancelButton);
    originalSubmitButtonParent.appendChild(submitButton);
  }

  // Function to hide all sections
  function hideAllSections() {
    sectionElements.forEach((section) => {
      section.style.display = "none";
    });
  }

  // Function to clear input fields of other radio buttons
  function clearOtherInputFields(currentRadio) {
    radioButtons.forEach((radioButton) => {
      if (radioButton !== currentRadio) {
        const form = radioButton.closest(".main__wrapper").querySelector("form");
        if (form) {
          form.reset();
        }
      }
    });
  }

  // Function to handle form submission
  function handleFormSubmission() {
    hideAllSections(); // Hide all sections first
    radioEl.forEach((radio, i) => {
      if (radio.checked) {
        if (radio.id == sectionElements[i].id) {
          sectionElements[i].style.display = "block";
          originalSubmitButtonParent = submitButton.parentElement;
          cancelButtonDestination[i].appendChild(cancelButton);
          sessionStorage.setItem("currentRadioItem", radio.id);
        }
      }
    });
    submitButton.disabled = true;
  }

  window.onload = function () {
    const currentSessionValue = sessionStorage.getItem("currentRadioItem");

    radioEl.forEach((radio, i) => {
      if (radio.id == currentSessionValue) {
        sectionElements[i].style.display = "block";
        originalSubmitButtonParent = submitButton.parentElement;
        cancelButtonDestination[i].appendChild(cancelButton);
      }
    });

    radioButtons.forEach((radioButton) => {
      if (radioButton.id == currentSessionValue) {
        const closestParent = radioButton.closest(".main__wrapper");
        const closestParentDesc = closestParent.querySelector("#sector_descriptions");
        const currentDescHeight = closestParentDesc.scrollHeight;
        closestParentDesc.style.height = `${currentDescHeight}px`;
      }
    });
  };

  // Collapse Previous details and expand current one + activate the current button
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("click", function (event) {
      description.forEach((el) => (el.style.height = "0px"));
      hideAllSections();
      clearOtherInputFields(radioButton);
      const closestParent = radioButton.closest(".main__wrapper");
      const closestParentDesc = closestParent.querySelector("#sector_descriptions");
      const currentForm = closestParent.querySelector("form");

      if (currentForm) {
        const allInputs = currentForm.querySelectorAll("input");

        submitButton.setAttribute("disabled", "");

        allInputs.forEach((input) => {
          input.addEventListener("input", function () {
            if (input.value.trim()) {
              submitButton.removeAttribute("disabled");
            } else {
              submitButton.setAttribute("disabled", "");
            }
          });

          input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent default form submission behavior
              handleFormSubmission(); // Trigger form submission manually
            }
          });
        });
      }

      if (radioButton.checked) {
        const currentDescHeight = closestParentDesc.scrollHeight;
        closestParentDesc.style.height = `${currentDescHeight}px`;
      }
    });
  });

  // Click Submit to open relevant table
  submitButton.addEventListener("click", handleFormSubmission);

  // Handle cancel button click event
  cancelButton.addEventListener("click", () => {
    moveCancelButtonBack();
    hideAllSections(); // Hide all sections when cancel button is clicked
  });

  // Click cancel button destination, to move cancel button back to its original location
  cancelButtonDestination.forEach((destination, index) => {
    destination.addEventListener("click", () => {
      moveCancelButtonBack();
      hideAllSections(); // Hide all sections when cancel button destination is clicked

      // Clear all input fields in the associated form
      const form = radioButtons[index].closest(".main__wrapper").querySelector("form");
      if (form) {
        form.reset();
      }
    });
  });
});
