public function getSelectedCourse($id){
    $course = Course::with(['assignedCourseAdmins.department'])->find($id);
    if ($course) {
        return response()->json($course);
    } else {
        return response()->json(['message' => 'Course not found'], 404);
    }
}
