import DynamicForm from '@/components/DynamicForm/Form'
import VText from '@/components/Demo/VText'
import VButton from '@/components/Demo/VButton'
import VPicture from '@/components/Demo/VPicture'
export default {
  install: (Vue) => {
    Vue.component(DynamicForm.name, DynamicForm),
    Vue.component(VText.name, VText),
    Vue.component(VButton.name, VButton),
    Vue.component(VPicture.name, VPicture)
  }
}
