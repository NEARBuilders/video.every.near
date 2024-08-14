import GetSrc from "./GetSrc";
import Display from "./Display";
import GetUploadUrl from "./GetUploadUrl";
import ResumableUploadAsset from "./ResumableUploadAsset";
import DirectUploadAsset from "./DirectUploadAsset";
import DebugState from "./DebugState";
import ApiKey from "./ApiKey";
import GetAssets from "./GetAssets";
import FileUploader from "./BackendUpload";

export const VideoPlayer = ({ children }) => {};

VideoPlayer.Display = Display;
VideoPlayer.GetSrc = GetSrc;
VideoPlayer.GetUploadUrl = GetUploadUrl;
VideoPlayer.DirectUploadAsset = DirectUploadAsset;
VideoPlayer.ResumableUploadAsset = ResumableUploadAsset;
VideoPlayer.Debug = DebugState;
VideoPlayer.GetAssets = GetAssets;
VideoPlayer.FileUploader = FileUploader;
VideoPlayer.ApiKey = ApiKey;
