import OthersComment from './SubComment/OthersComment'
import DoComment from './DoComment/DoComment'

export default function Comment() {
    return (
        <>  
            <div style={{border:'2px solid red'}}>
            <DoComment/>
            </div>
            <div style={{border:'2px solid red'}}>
            <OthersComment/>
            </div>
        </>
    )
}