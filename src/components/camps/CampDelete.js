import React from 'react'
import { connect } from 'react-redux'

import history from '../../history'
import { fetchCamp, deleteCamp } from '../../action'

// Poral Modal
class CampDelete extends React.Component {
    componentDidMount() {
        this.props.fetchCamp(this.props.match.params.id)
    }
    render() {
        if (!this.props.camp) return <div>Loading</div>
        return (
            <div >
                <div class="ui  cards" style={{marginTop:130,marginBottom:130}}>
                    <div class="ui  centered card" >
                        <div class="content">
                            <div class="header">
                                刪除露營地
                            </div>
                            <div className="description">確定刪除"{this.props.camp.title}"嗎？</div>
                            <div class="extra content">
                                <div class="ui two  buttons">
                                    <div onClick={() => history.push('/')} class="ui basic grey  button">取消</div>
                                    <div onClick={() => this.props.deleteCamp(this.props.match.params.id)} class="ui basic red button">刪除</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        camp: state.camps[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchCamp, deleteCamp })(CampDelete);