import { observable, action, computed } from 'mobx';
import workflowStore from './workflowStore';
import subjectsStore from './subjectsStore';

export class AnnotationsStore {
  @observable annotations = [];

  @action setAnnotation(annotation) {
    const currentAnnotations = this.annotations;
    const newAnnotations = currentAnnotations.concat([annotation]);
    this.annotations = newAnnotations;
  }

  @action removeAnnotation(annotation) {
    this.annotations.remove(annotation);
  }

  @action clear() {
    this.annotations.clear();
  }

  @computed get lastAnnotation() {
    return this.annotations[this.annotations.length - 1] || null;
  }

  onAnnotationChange(value) {
    const { currentTaskKey } = workflowStore;
    const newAnnotation = { value, task: currentTaskKey };
    const currentStoredAnnotation = this.annotations.find((annotation, index) => {
      return annotation && annotation.task === currentTaskKey;
    });

    if (currentStoredAnnotation) {
      this.removeAnnotation(currentStoredAnnotation);
    }

    this.setAnnotation(newAnnotation);
  }

  onSubmit() {
    Promise.resolve(this.clear())
      .then(subjectsStore.getNextSubject());
  }
}

export default new AnnotationsStore();
