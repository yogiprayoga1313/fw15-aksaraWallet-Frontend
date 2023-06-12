import React from 'react'

    function PinInput({onChangePin}) {
        const pinInput = {
            input1: React.useRef(),
            input2: React.useRef(),
            input3: React.useRef(),
            input4: React.useRef(),
            input5: React.useRef(),
            input6: React.useRef(),
        }
        const changeValue = (e) => {
            if (e.target.value.length > 0) {
                e.target.value = e.target.value.slice(e.target.value.length - 1)
                if (parseInt(e.target.name) < 6) {
                    pinInput[`input${parseInt(e.target.name) + 1}`].current.focus()
                }
            }else{
                if (parseInt(e.target.name) > 1) {
                    pinInput[`input${parseInt(e.target.name) - 1}`].current.focus()
                }
            }
            const pin = []
            for (const key in pinInput) {
                pin.push(pinInput[key].current.value)
            }
            onChangePin(pin.join(''))
        }

        return (
            <div className='flex flex-col gap-10 mt-6 items-center'>
                <div className='flex gap-4'>
                    <div>
                        <input onChange={changeValue} name='1' ref={pinInput.input1} type="number" className="text-center input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <input onChange={changeValue} name='2' ref={pinInput.input2} type="number" className="text-center input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <input onChange={changeValue} name='3' ref={pinInput.input3} type="number" className="text-center input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <input onChange={changeValue} name='4' ref={pinInput.input4} type="number" className="text-center input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <input onChange={changeValue} name='5' ref={pinInput.input5} type="number" className="text-center input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <input onChange={changeValue} name='6' ref={pinInput.input6} type="number" className="text-center input input-bordered w-full max-w-xs" />
                    </div>
                </div>
            </div>
        )
    }

    export default PinInput