// Minimal test for ContactView.vue form submission
import { mount } from '@vue/test-utils';
import ContactView from '../ContactView.vue';

describe('ContactView', () => {
  it('shows error if fields are empty', async () => {
    const wrapper = mount(ContactView);
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.html()).toContain('All fields are required.');
  });
});
