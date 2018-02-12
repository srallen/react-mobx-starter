import { observable, action, computed } from 'mobx';
import workflowStore from './workflowStore';

export class AnnotationsStore {
  @observable annotations = [];

  @action setAnnotation(annotation) {
    const currentAnnotations = this.annotations;
    const newAnnotations = currentAnnotations.concat([annotation]);
    this.annotations = newAnnotations;
  }

  @computed get lastAnnotation() {
    return this.annotations[this.annotations.length - 1] || null;
  }

  onAnnotationChange(value) {
    const { currentTaskKey } = workflowStore;
    const newAnnotation = { value, task: currentTaskKey };
    const currentStoredAnnotation = this.annotations.find((annotation, index) => {
      return annotation[index].task === currentTaskKey;
    });

    if (currentStoredAnnotation) {
      this.annotations.remove(currentStoredAnnotation);
    }

    this.setAnnotation(newAnnotation);
  }

  onSubmit() {
    this.clear();
  }

  clear() {
    this.annotations.clear();
  }
}

export default new AnnotationsStore();
