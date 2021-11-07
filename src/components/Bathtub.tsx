/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import { Resolver } from 'dns';

export enum BathtubMode{
    Increase, Decrease, Stop, Initial
}

interface BathtubProps {
    mode: BathtubMode;
    onEnd: ()=>void;
}

const Bathtub = (props: BathtubProps) => {
    const [height, setHeight] = useState(0);
    const [isStop, setStop] = useState(false);
    const [mode, setMode] = useState(BathtubMode.Initial);
    let delay: any = null;
    useEffect(()=>{
        if (props.mode === BathtubMode.Stop) {
            setStop(true);
            return
        }
        if (props.mode === BathtubMode.Initial) {
            setStop(true);
            setHeight(0);
            return;
        }
        setStop(false);
        setMode(props.mode);
    }, [props.mode] );

    useEffect(()=>{
        if(!isStop)
            running();
    },[height, isStop])

    const running = async() => {
        if(isStop) return;
        let res = await handleHeight();
        console.log("await",res);
        if(_.has(res, "height")) {
            setHeight(_.get(res, "height"));
        } else {
            props.onEnd();
        }
    }

    const handleHeight= () => new Promise<any>((res, rej)=>{
        _.delay(()=>{
            console.log("mode", props.mode);
            switch (props.mode) {
                case BathtubMode.Increase:
                    if (height > 4) return res({isStop: true});
                    res({height: height+1});
                    break;
                case BathtubMode.Decrease:
                    if(height - 1 < 0) return res({isStop: true});
                    res({height: height-1});
                    break;
                case BathtubMode.Stop: return res({isStop: true});
            }
        }, 1000)
    })

    const renderWater = () => {
       return _.map( _.range(height), (_, index) => {
            return <div className="p-2 bg-primary mx-1 border" key={index} style={{height: '100px'}} />
        });
    }
    return (
        <div className="d-flex flex-column-reverse m-auto" style={{height: '500px', width: '300px'}}>
            {renderWater()}
        </div>
    );
}

export default Bathtub;
