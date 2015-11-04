/** @jsx ReactBEM.createElement **/
/*
 * Photo Editor SDK - photoeditorsdk.com
 * Copyright (c) 2013-2015 9elements GmbH
 *
 * Released under Attribution-NonCommercial 3.0 Unported
 * http://creativecommons.org/licenses/by-nc/3.0/
 *
 * For commercial use, please contact us at contact@9elements.com
 */

import { ReactBEM, BaseComponent, Constants, Vector2 } from '../../../globals'
import ScrollbarComponent from '../../scrollbar-component'
import ModalManager from '../../../lib/modal-manager'

export default class StickersOverviewControlsComponent extends BaseComponent {
  constructor (...args) {
    super(...args)

    this._bindAll('_onBackClick')
    this._operation = this.getSharedState('operation')
    this._stickers = this.getSharedState('stickers')

    this._availableStickers = []
    this._initStickers()
  }

  // -------------------------------------------------------------------------- STICKERS

  /**
   * Initializes the available stickers
   * @private
   */
  _initStickers () {
    const additionalStickers = this.props.options.stickers || []
    const replaceStickers = !!this.props.options.replaceStickers

    const stickers = [
      'glasses-nerd.png',
      'glasses-normal.png',
      'glasses-shutter-green.png',
      'glasses-shutter-yellow.png',
      'glasses-sun.png',
      'hat-cap.png',
      'hat-cylinder.png',
      'hat-party.png',
      'hat-sheriff.png',
      'heart.png',
      'mustache-long.png',
      'mustache1.png',
      'mustache2.png',
      'mustache3.png',
      'pipe.png',
      'snowflake.png',
      'star.png'
    ].map((stickerName) =>
      [
        `stickers/small/${stickerName}`,
        `stickers/large/${stickerName}`
      ]
    )

    if (replaceStickers) {
      this._availableStickers = additionalStickers
    } else {
      this._availableStickers = stickers.concat(additionalStickers)
    }
  }

  // -------------------------------------------------------------------------- EVENTS

  /**
   * Gets called when the user clicks the back button
   * @param {Event} e
   * @private
   */
  _onBackClick (e) {
    this.props.onBack()
  }

  /**
   * Gets called when a sticker has been clicked
   * @param  {Array.<String>} stickerPaths
   * @private
   */
  _onStickerClick (stickerPaths) {
    const largePath = stickerPaths[1]

    const { ui } = this.context
    const translate = ui.translate.bind(ui)
    const resolvedStickerPath = ui.getAssetPath(largePath)
    const image = new window.Image()

    let loadingModal
    let loadTimeout = setTimeout(() => {
      loadingModal = ModalManager.instance.displayLoading(translate('loading.loading'))
    }, 100)

    image.addEventListener('load', () => {
      if (loadingModal) loadingModal.close()
      if (loadTimeout) {
        clearTimeout(loadTimeout)
        loadTimeout = null
      }

      const sticker = this._operation.createSticker({
        image,
        position: new Vector2(0.5, 0.5),
        scale: new Vector2(1.0, 1.0),
        rotation: 0
      })
      this._stickers.push(sticker)
      this._operation.setDirty(true)

      this._emitEvent(Constants.EVENTS.CANVAS_RENDER)

      // Broadcast new state
      this.setSharedState({
        selectedSticker: sticker,
        stickers: this._stickers
      })
    })

    image.addEventListener('error', () => {
      if (loadingModal) loadingModal.close()
      if (loadTimeout) {
        clearTimeout(loadTimeout)
        loadTimeout = null
      }

      ModalManager.instance.displayError(
        translate('errors.imageLoadFail.title'),
        translate('errors.imageLoadFail.text', { path: image.src })
      )
    })

    image.crossOrigin = 'Anonymous'
    image.src = resolvedStickerPath
  }

  // -------------------------------------------------------------------------- RENDERING

  /**
   * Renders this component
   * @return {ReactBEM.Element}
   */
  renderWithBEM () {
    const ui = this.context.ui

    const listItems = this._availableStickers.map((paths) => {
      const smallPath = paths[0]
      const largePath = paths[1]
      return (<li
        bem='e:item'
        key={largePath}
        onClick={this._onStickerClick.bind(this, [smallPath, largePath])}>
        <bem specifier='$b:controls'>
          <div bem='$e:button m:withLabel'>
            <img bem='e:icon' src={ui.getHelpers().assetPath(smallPath)} />
          </div>
        </bem>
      </li>)
    })

    return (<div bem='$b:controls e:table'>
      <div bem='e:cell m:button m:withBorderRight m:narrow'>
        <div bem='$e:button m:narrow' onClick={this._onBackClick}>
          <img bem='e:icon' src={ui.getHelpers().assetPath(`controls/back@2x.png`, true)} />
        </div>
      </div>
      <div bem='e:cell m:list'>
        <ScrollbarComponent>
          <ul bem='$e:list'>
            {listItems}
          </ul>
        </ScrollbarComponent>
      </div>
    </div>)
  }
}
