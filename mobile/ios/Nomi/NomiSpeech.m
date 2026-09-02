#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

// NomiSpeech.swift'i RN'e tanıtır (RCT_EXTERN_MODULE). Android'deki NomiSpeechModule
// ile aynı yöntemler/olaylar.
@interface RCT_EXTERN_MODULE(NomiSpeech, RCTEventEmitter)

RCT_EXTERN_METHOD(start:(NSString *)locale
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isAvailable:(NSString *)locale
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setKeepAwake:(BOOL)on)
RCT_EXTERN_METHOD(startRecording:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(stopRecording:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(stop)
RCT_EXTERN_METHOD(cancel)
RCT_EXTERN_METHOD(destroy)

@end
