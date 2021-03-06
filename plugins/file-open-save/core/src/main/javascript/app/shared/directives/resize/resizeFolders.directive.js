/*!
 * Copyright 2017 Pentaho Corporation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
  "../../../components/utils",
  "angular"
], function(utils, angular) {
  resize.$inject = ["$window"];
  /**
   * @param {Service} $window - A reference to the browser's window object
   * @return {{restrict: string, link: link}} - resizeFolders directive
   */
  function resize($window) {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var w = angular.element($window);

        w.on("resize", function() {
          resizeFolderWidths();
          scope.$apply();
        });

        /**
         * Sets the scope.vm.width of either the maximum width of any visible folder,
         * or to the client width of the folder container
         */
        function resizeFolderWidths() {
          var maxWidth = scope.vm.maxWidth;
          var clientWidth = element[0].parentElement.parentElement.clientWidth;
          scope.vm.width = maxWidth > clientWidth ? maxWidth : clientWidth;
        }
      }
    };
  }

  return {
    name: "resizeFolders",
    options: ["$window", resize]
  };
});
