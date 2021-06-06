import {mount} from "@vue/test-utils";
import unitSample from "@/components/unitSample";

describe('MyButton', () => {
    const props = {
        txt: 'MyButtonTxt',
    }

    it('ボタンが正しく表示されているかの確認', () => {
        // propsを受け取り shallowMountし テスト対象component生成
        const wrapper = mount(unitSample, {propsData: { ...props }})

        // {{ txt }}にpropsで受け取った値が表示されているか確認
        expect(wrapper.text()).toBe(props.txt)
    });

    it('clickイベントの確認', () => {
        const wrapper = mount(unitSample, {propsData: { ...props }})

        expect(wrapper.emitted('myAction')).toBeUndefined()

        //do click event
        wrapper.trigger('click')

        expect(wrapper.emitted('myAction')).toBeTruthy()
    });
})