if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/fahad/.gradle/caches/8.10.2/transforms/de6fa714924ea18db1a35977514a2c3a/transformed/hermes-android-0.76.7-release/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/fahad/.gradle/caches/8.10.2/transforms/de6fa714924ea18db1a35977514a2c3a/transformed/hermes-android-0.76.7-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

