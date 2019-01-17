import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

/**
 * `jwd-img-compare`
 * An image comparison webcomponent
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class JwdImgCompare extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        :host #boundaryBox {
          overflow: hidden;
          background-color: #000;
          position: relative;
        }
        :host #slider {
          width: 5px;
          height: 100%;
          background-color: rgba(255,255,255,0.5);
          position: absolute;
          cursor: ew-resize;
          z-index: 1001;
        }
        :host div#slider::before, :host div#slider::after {
          content: "";
          width: 30px;
          height: 30px;
          background: rgba(255,255,255,0.5) url("/assets/arrows.png") no-repeat center;
          background-size: 30px;
          color: #fff;
          font-size: 26px;
          line-height: 30px;
          text-align: center;
          top: 45%;
          left: -12px;
          position: absolute;
        }
        :host .images {
          height: 100%;
          position: absolute;
          background-repeat: no-repeat;
          background-position: center fixed;
        }
        :host #img1 {
          z-index: 20;
        }
        :host #img2 {
          width: 100%;
          z-index: 10;
        }
        :host .caption {
          border: 1px solid #ccc;
          clear: both;
          color: #1a1a1a;
          padding: 10px;
          font-size: 0.9rem;
        }
        :host .caption .captionTitle {
          margin: 5px 0px;
          font-size: 1rem;
        }
        :host .caption p {
          margin: 0px;
        }
      </style>
      <div id="boundaryBox" style$="width: {{width}}px; height: {{height}}px;">
        <div id="img1" class="images" style="width: {{sliderPos}}px; background-image: url({{img1}});"></div>
        <div id="slider" on-track="_sliderDrag" style="left: {{sliderPos}}px;"></div>
        <div id="img2" class="images" style="background-image: url({{img2}});"></div>
      </div>
      <template is="dom-if" if="{{_showCaption}}">
        <div class="caption">
          <template is="dom-if" if="{{captionTitle}}">
            <h4 class="captionTitle">{{captionTitle}}</h4>
          </template>
          <p>{{caption}}</p>
        </div>
      </template>
    `;
  }
  static get properties() {
    return {
      /* The width of the image compare element */
      width: {
        type: Number,
        value: 700
      },
      /* The height of the image compare element */
      height: {
        type: Number,
        value: 400
      },
      /* Text to be shown underneath the image comparison */
      caption: {
        type: String,
        value: ""
      },
      /* Title for the caption area */
      captionTitle: {
        type: String,
        value: ""
      },
      /* The URL of the left-hand image */
      img1: {
        type: String,
        value: '../assets/img1.jpg'
      },
      /* The URL of the right-hand image */
      img2: {
        type: String,
        value: '../assets/img2.jpg'
      },
      /* The position of the slider, defaults to halfway across */
      sliderPos: {
        type: Number,
        value: 350
      },
      _showCaption: {
        type: Boolean,
        computed: '_showCaptionFunc(caption, captionTitle)'
      }
    };
  }

  ready(){
    super.ready();
    this.addEventListener('mousedown', this._preventHighlight);
  }

  /* Listener function to prevent issues if the user unknowingly highlights an image (prevents slider from moving) */
  _preventHighlight(e){
    e.preventDefault();
  }

  /* Get the starting X coordinate of the boundary (used for offsetting the slider position) */
  _getBoundaryPos(){
    return this.$.boundaryBox.getBoundingClientRect().x;
  }

  /* The caption box will only show on the component if this function returns true */
  _showCaptionFunc(caption, title){
    return caption || title;
  }

  /* Function which moves the slider as the user drags it */
  _sliderDrag(e){
    console.log("Dragging");
    switch(e.detail.state){
      case 'track':
        this.sliderPos = Math.min(Math.max(15, e.detail.x - this._getBoundaryPos()), (this.width-20));
        break;
    }
  }

}

window.customElements.define('jwd-img-compare', JwdImgCompare);
