/* global PhotoEditorSDK */
/*
 * Photo Editor SDK - photoeditorsdk.com
 * Copyright (c) 2013-2015 9elements GmbH
 *
 * Released under Attribution-NonCommercial 3.0 Unported
 * http://creativecommons.org/licenses/by-nc/3.0/
 *
 * For commercial use, please contact us at contact@9elements.com
 */

// TODO: React license missing in build
import React from 'react'
// TODO: Classnames license (probably) missing in build
import Classnames from 'classnames'

import BEM from './lib/bem'
import ReactBEM from './lib/react-bem'
import BaseComponent from './components/base-component'
import Utils from './lib/utils'
import Constants from './lib/constants'
import SharedState from './lib/shared-state'

const Promise = PhotoEditorSDK.Promise
const Log = PhotoEditorSDK.Log
const Color = PhotoEditorSDK.Color
const Vector2 = PhotoEditorSDK.Vector2
const SDKUtils = PhotoEditorSDK.Utils
const EventEmitter = PhotoEditorSDK.EventEmitter
const Base64 = PhotoEditorSDK.Base64
const RenderType = PhotoEditorSDK.RenderType

export {
  Log, Promise, Utils, React, BEM, Classnames, BaseComponent, ReactBEM, Vector2,
  SDKUtils, EventEmitter, Constants, SharedState, Color, Base64, RenderType
}
