import modalstyles from './modalstyles';

export default class ChangePasswordModal {

    static renderModal = ({error}) => {
        <Modal
            isVisible={true}
            style={modalstyles.bottomModal}>
            <View style={modalstyles.modalContent}>
                <Text>{error}</Text>
                <TouchableOpacity onPress={() => this.setState({ visibleModal: null })}>
                    <View style={modalstyles.button}>
                        <Text>Close</Text>
                    </View>
                </TouchableOpacity>
            </View>              
        </Modal>  
    }
}