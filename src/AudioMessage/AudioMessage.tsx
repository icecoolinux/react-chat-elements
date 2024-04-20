import React from 'react'
import { IAudioMessageProps } from '../type'
import AudioPlayer from './AudioPlayer';
import './AudioMessage.css'



const AudioMessage: React.FC<IAudioMessageProps> = props => {
    //const controlsList = props.data.controlsList;

    return (
        <div className={'rce-mbox-audio'} style={props.customStyle}>
            {/*
            <audio {...props.audioProps} controls controlsList={controlsList ? controlsList : 'nodownload'}>
            <source src={props.data.audioURL} type={props.data.audioType || 'audio/mp3'} />
            Your browser does not support the audio element.
            </audio>
            */}
            <div className={'rce-mbox-audioplayer'} >
                <AudioPlayer  src={props.data.audioURL || ''} type={props.data.audioType || 'audio/mp3'} autoPlay={props.data.autoPlay || false} />
            </div>
            {props.text && <div className='rce-mbox-text'>{props.text}</div>}
        </div>
    )
}

export default AudioMessage
